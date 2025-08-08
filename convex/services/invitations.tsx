/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { render } from '@react-email/components';
import { ConvexError, v } from 'convex/values';
import { Resend } from 'resend';
import InvitationEmail from '@/emails/invitation';
import { api, internal } from '../_generated/api';
import {
  action,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from '../_generated/server';
import '../polyfills';
import { getInvitationById } from '../utils/invitations';
import { createMembership } from '../utils/memberships';
import { getCurrentUser, getUserByEmail } from '../utils/users';

// Query

export const getById = query({
  args: { id: v.id('invitations') },
  handler: async (ctx, args) => {
    // Get the invitation
    const invitation = await getInvitationById(ctx, args.id);
    if (!invitation) {
      throw new Error(`Invitation with ID ${args.id} not found.`);
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
    if (!inviteeUser) {
      throw new Error(`User with email ${invitation.inviteeEmail} not found.`);
    }

    return {
      ...invitation,
      invitedByEmail: invitedByUser.email,
      invitedByName: `${invitedByUser.firstName} ${invitedByUser.lastName}`,
      inviteeUser,
      organisationName: organisation.name,
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

// Mutate

export const createInvitation = internalMutation({
  args: {
    invitedByUserId: v.id('users'),
    inviteeEmail: v.string(),
    organisationId: v.id('organisations'),
    organisationName: v.string(),
    role: v.string(),
    isAdmin: v.boolean(),
  },
  handler: async (ctx, args) => {
    const invitationId = await ctx.db.insert('invitations', {
      ...args,
      status: 'pending',
    });
    return invitationId;
  },
});

export const deleteInvitation = internalMutation({
  args: { invitationId: v.id('invitations') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.invitationId);
  },
});

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

// Action

export const create = action({
  args: {
    inviteeEmail: v.string(),
    role: v.string(),
    isAdmin: v.boolean(),
  },
  handler: async (ctx, args) => {
    const invitedByUser = await ctx.runQuery(api.services.users.getCurrent);
    if (!invitedByUser) {
      throw new ConvexError('not_authenticated');
    }

    if (invitedByUser.email === args.inviteeEmail) {
      throw new ConvexError('self_invitation');
    }

    const activeOrganisation = await ctx.runQuery(
      api.services.organisations.getActive
    );
    if (!activeOrganisation) {
      throw new ConvexError('no_active_organisation');
    }

    const existingInvitation = await ctx.runQuery(
      internal.services.invitations.getByEmailAndOrganisation,
      {
        email: args.inviteeEmail,
        organisationId: activeOrganisation._id,
      }
    );

    if (existingInvitation) {
      throw new ConvexError('email_already_exists');
    }

    const invitationId = await ctx.runMutation(
      internal.services.invitations.createInvitation,
      {
        ...args,
        invitedByUserId: invitedByUser._id,
        organisationId: activeOrganisation._id,
        organisationName: activeOrganisation.name,
      }
    );

    const inviteeUser = await ctx.runQuery(api.services.users.getByEmail, {
      email: args.inviteeEmail,
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
      await ctx.runMutation(internal.services.invitations.deleteInvitation, {
        invitationId,
      });

      throw new Error('Failed to send invitation email');
    }
  },
});
