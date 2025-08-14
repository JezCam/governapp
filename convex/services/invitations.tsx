/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { render } from '@react-email/components';
import { ConvexError, v } from 'convex/values';
import { Resend } from 'resend';
import InvitationEmail from '@/emails/invitation';
import { api, internal } from '../_generated/api';
import { internalQuery, mutation, query } from '../_generated/server';
import '../polyfills';
import {
  getInvitationById,
  listInvitationsByEmailAndStatus,
} from '../utils/invitations';
import { createMembership } from '../utils/memberships';
import { getCurrentUser, getUserByEmail } from '../utils/users';

// Query

export const getByIdWithOrganisation = query({
  args: { id: v.id('invitations') },
  handler: async (ctx, args) => {
    // Get the invitation
    const invitation = await getInvitationById(ctx, args.id);
    if (!invitation) {
      return null;
    }

    // Get the invited by user
    const invitedByUser = await ctx.db.get(invitation.invitedByUserId);
    if (!invitedByUser) {
      throw new Error(`User with ID ${invitation.invitedByUserId} not found.`);
    }

    // Get the organisation
    const organisation = await ctx.db.get(invitation.organisationId);
    if (!organisation) {
      throw new Error(
        `Organisation with ID ${invitation.organisationId} not found.`
      );
    }

    // Get the invitees user
    const inviteeUser = await getUserByEmail(ctx, invitation.inviteeEmail);

    return {
      ...invitation,
      invitedByUser,
      inviteeUser,
      organisation,
    };
  },
});

export const getByEmailAndOrganisation = internalQuery({
  args: {
    email: v.string(),
    organisationId: v.id('organisations'),
  },
  handler: async (ctx, args) => {
    const invitation = await ctx.db
      .query('invitations')
      .withIndex('by_organisation_email', (q) =>
        q
          .eq('organisationId', args.organisationId)
          .eq('inviteeEmail', args.email)
      )
      .first();

    return invitation;
  },
});

export const listPendingByCurrentUserWithOrganisationAndInvitedByUser = query({
  handler: async (ctx) => {
    const currentUser = await getCurrentUser(ctx);

    const curreentUserEmail = currentUser.email;
    if (!curreentUserEmail) {
      throw new ConvexError('missing_email');
    }

    const invitations = await listInvitationsByEmailAndStatus(
      ctx,
      curreentUserEmail,
      'pending'
    );

    const invitationsWithOrganisationAndInvitedByUser = await Promise.all(
      invitations.map(async (invitation) => {
        const organisation = await ctx.db.get(invitation.organisationId);
        if (!organisation) {
          return null;
        }

        const invitedByUser = await ctx.db.get(invitation.invitedByUserId);
        if (!invitedByUser) {
          return null;
        }

        return {
          ...invitation,
          organisation,
          invitedByUser,
        };
      })
    ).then((results) => results.filter((invitation) => invitation !== null));

    return invitationsWithOrganisationAndInvitedByUser;
  },
});

// Mutate

export const acceptInvitationById = mutation({
  args: { invitationId: v.id('invitations') },
  handler: async (ctx, args) => {
    const invitation = await getInvitationById(ctx, args.invitationId);
    if (!invitation) {
      throw new ConvexError('invitation_not_found');
    }

    const currentUser = await getCurrentUser(ctx);
    if (currentUser.email !== invitation.inviteeEmail) {
      throw new ConvexError('invitee_email_mismatch');
    }

    // Create a new membership
    await createMembership(
      ctx,
      currentUser._id,
      invitation.organisationId,
      invitation.role,
      invitation.isAdmin
    );

    // Update the invitation status to accepted
    await ctx.db.patch(invitation._id, { status: 'accepted' });
  },
});

export const declineInvitationById = mutation({
  args: { invitationId: v.id('invitations') },
  handler: async (ctx, args) => {
    const invitation = await getInvitationById(ctx, args.invitationId);
    if (!invitation) {
      throw new ConvexError('invitation_not_found');
    }

    const currentUser = await getCurrentUser(ctx);
    if (currentUser.email !== invitation.inviteeEmail) {
      throw new ConvexError('invitee_email_mismatch');
    }

    // Update the invitation status to declined
    await ctx.db.patch(invitation._id, { status: 'declined' });
  },
});

export const create = mutation({
  args: {
    inviteeEmail: v.string(),
    role: v.string(),
    isAdmin: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Authenticate user
    const invitedByUser = await getCurrentUser(ctx);

    // Check if the invitee is trying to invite themselves
    if (invitedByUser.email === args.inviteeEmail) {
      throw new ConvexError('self_invitation');
    }

    // Get the active organisation
    const activeOrganisation = await ctx.runQuery(
      api.services.organisations.getActive
    );
    if (!activeOrganisation) {
      throw new ConvexError('no_active_organisation');
    }

    // Get the invitee user by email
    const inviteeUser = await ctx.runQuery(api.services.users.getByEmail, {
      email: args.inviteeEmail,
    });

    // Check if the invitee already has an active membership in the organisation
    if (inviteeUser) {
      const existingMembership = await ctx.db
        .query('memberships')
        .withIndex('by_organisation_user', (q) =>
          q
            .eq('organisationId', activeOrganisation._id)
            .eq('userId', inviteeUser._id)
        )
        .first();

      if (existingMembership) {
        throw new ConvexError('user_already_member');
      }
    }

    // Check if there's already an invitation for this email and organisation
    const existingInvitation = await ctx.runQuery(
      internal.services.invitations.getByEmailAndOrganisation,
      {
        email: args.inviteeEmail,
        organisationId: activeOrganisation._id,
      }
    );

    if (existingInvitation) {
      throw new ConvexError('invitation_already_exists');
    }

    // Create the invitation
    const invitationId = await ctx.db.insert('invitations', {
      ...args,
      invitedByUserId: invitedByUser._id,
      organisationId: activeOrganisation._id,
      status: 'pending',
    });

    // Send the email
    try {
      const resend = new Resend(process.env.AUTH_RESEND_KEY);

      await resend.emails.send({
        from: 'GovernApp <onboarding@resend.dev>',
        to: args.inviteeEmail,
        subject: `You're invited to join ${activeOrganisation.name} on GovernApp`,
        html: await render(
          <InvitationEmail
            invitedByEmail={invitedByUser.email}
            invitedByName={`${invitedByUser.firstName} ${invitedByUser.lastName}`}
            inviteeImageUrl={inviteeUser ? inviteeUser.imageUrl : undefined}
            inviteeName={
              inviteeUser
                ? `${inviteeUser.firstName} ${inviteeUser.lastName}`
                : undefined
            }
            inviteLink={`${process.env.SITE_URL}/invitation/${invitationId}`}
            organisationImageUrl={activeOrganisation.imageUrl}
            organisationName={activeOrganisation.name}
          />
        ),
      });
    } catch (error) {
      console.error('Error sending invitation email:', error);

      // Delete the invitation if the email fails to send
      await ctx.db.delete(invitationId);

      throw new Error('Failed to send invitation email');
    }
  },
});
