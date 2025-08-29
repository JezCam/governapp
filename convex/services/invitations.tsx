/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { render } from '@react-email/components';
import { v } from 'convex/values';
import { Resend } from 'resend';
import InvitationEmail from '@/emails/invitation';
import { api } from '../_generated/api';
import {
  action,
  type MutationCtx,
  mutation,
  type QueryCtx,
  query,
} from '../_generated/server';
import '../polyfills';
import type { Id } from '../_generated/dataModel';
import {
  listInvitationsByEmailAndOrganisation,
  listInvitationsByEmailAndStatus,
  listInvitationsByOrganisationAndStatus,
} from '../data/invitations';
import { createMembership } from '../data/memberships';
import { getUserByEmail } from '../data/users';
import { createConvexError } from '../errors';
import {
  isAdminByCurrentUserAndActiveOrganisation,
  isAdminByUserIdAndOrganisationId,
} from './memberships';
import { getActiveOrganisationId } from './organisations';
import { getCurrentUser } from './users';

// Helpers
export async function getInvitationById(
  ctx: QueryCtx | MutationCtx,
  invitationId: Id<'invitations'>
) {
  const invitation = await ctx.db.get(invitationId);
  if (!invitation) {
    throw createConvexError('INVITATION_NOT_FOUND');
  }

  return invitation;
}

// Queries

export const getByIdWithOrganisation = query({
  args: { id: v.id('invitations') },
  handler: async (ctx, args) => {
    // Get the invitation
    const invitation = await getInvitationById(ctx, args.id);

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

export const listPendingByCurrentUserWithOrganisationAndInvitedByUser = query({
  handler: async (ctx) => {
    const currentUser = await getCurrentUser(ctx);

    const curreentUserEmail = currentUser.email;
    if (!curreentUserEmail) {
      throw createConvexError('NO_EMAIL');
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

export const listPendingByActiveOrganisation = query({
  handler: async (ctx) => {
    const activeOrganisationId = await getActiveOrganisationId(ctx);
    const invitations = await listInvitationsByOrganisationAndStatus(
      ctx,
      activeOrganisationId,
      'pending'
    );

    return invitations;
  },
});

// Mutations

export const acceptInvitationById = mutation({
  args: { invitationId: v.id('invitations') },
  handler: async (ctx, args) => {
    // Get the invitation
    const invitation = await getInvitationById(ctx, args.invitationId);

    const currentUser = await getCurrentUser(ctx);
    if (currentUser.email !== invitation.inviteeEmail) {
      throw createConvexError('INVITEE_EMAIL_MISMATCH');
    }

    const { role, isAdmin } = invitation;

    // Create a new membership
    await createMembership(ctx, currentUser._id, invitation.organisationId, {
      role,
      isAdmin,
      isCreator: false, // Assuming the user is not the owner when accepting an invitation
    });

    // Set the active organisation for the user
    await ctx.db.patch(currentUser._id, {
      activeOrganisationId: invitation.organisationId,
    });

    // Update the invitation status to accepted
    await ctx.db.patch(invitation._id, { status: 'accepted' });
  },
});

export const declineInvitationById = mutation({
  args: { invitationId: v.id('invitations') },
  handler: async (ctx, args) => {
    // Get the invitation
    const invitation = await getInvitationById(ctx, args.invitationId);

    const currentUser = await getCurrentUser(ctx);
    if (currentUser.email !== invitation.inviteeEmail) {
      throw createConvexError('INVITEE_EMAIL_MISMATCH');
    }

    // Update the invitation status to declined
    await ctx.db.patch(invitation._id, { status: 'declined' });
  },
});

export const update = mutation({
  args: {
    invitationId: v.id('invitations'),
    role: v.string(),
    isAdmin: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Check if the current user is an admin of the organisation
    const isAdmin = await isAdminByCurrentUserAndActiveOrganisation(ctx);
    if (!isAdmin) {
      throw createConvexError('NOT_ADMIN_OF_ORGANISATION');
    }

    // Get invitation
    const invitation = await getInvitationById(ctx, args.invitationId);

    // Update the invitation
    await ctx.db.patch(invitation._id, {
      role: args.role,
      isAdmin: args.isAdmin,
    });
  },
});

export const deleteById = mutation({
  args: { invitationId: v.id('invitations') },
  handler: async (ctx, args) => {
    // Check if the current user is an admin of the organisation
    const isAdmin = await isAdminByCurrentUserAndActiveOrganisation(ctx);
    if (!isAdmin) {
      throw createConvexError('NOT_ADMIN_OF_ORGANISATION');
    }

    // Get the invitation
    const invitation = await getInvitationById(ctx, args.invitationId);

    // Delete the invitation
    await ctx.db.delete(invitation._id);
  },
});

export const create = mutation({
  args: {
    inviteeEmail: v.string(),
    role: v.string(),
    isAdmin: v.boolean(),
  },
  handler: async (ctx, args) => {
    const invitedByUser = await getCurrentUser(ctx);
    const activeOrganisationId = await getActiveOrganisationId(ctx);

    const isAdmin = await isAdminByUserIdAndOrganisationId(
      ctx,
      invitedByUser._id,
      activeOrganisationId
    );

    if (!isAdmin) {
      throw createConvexError('NOT_ADMIN_OF_ORGANISATION');
    }

    // Check if the invitee is trying to invite themselves
    if (invitedByUser.email === args.inviteeEmail) {
      throw createConvexError('CANNOT_INVITE_SELF');
    }

    // Get the invitee user by email
    const inviteeUser = await getUserByEmail(ctx, args.inviteeEmail);

    // Check if the invitee already has an active membership in the organisation
    if (inviteeUser) {
      const existingMembership = await ctx.db
        .query('memberships')
        .withIndex('by_organisation_user', (q) =>
          q
            .eq('organisationId', activeOrganisationId)
            .eq('userId', inviteeUser._id)
        )
        .first();

      if (existingMembership) {
        throw createConvexError('INVITEE_ALREADY_MEMBER');
      }
    }

    // Check if there's already an invitation for this email and organisation
    const existingInvitations = await listInvitationsByEmailAndOrganisation(
      ctx,
      args.inviteeEmail,
      activeOrganisationId
    );

    if (
      existingInvitations.some((invitation) => invitation.status === 'pending')
    ) {
      throw createConvexError('INVITATION_ALREADY_EXISTS');
    }

    // Create the invitation
    return await ctx.db.insert('invitations', {
      ...args,
      invitedByUserId: invitedByUser._id,
      organisationId: activeOrganisationId,
      status: 'pending',
    });
  },
});

export const email = action({
  args: {
    invitationId: v.id('invitations'),
  },
  handler: async (ctx, args) => {
    const invitation = await ctx.runQuery(
      api.services.invitations.getByIdWithOrganisation,
      { id: args.invitationId }
    );

    const activeOrganisation = invitation.organisation;
    const invitedByUser = invitation.invitedByUser;
    const inviteeUser = invitation.inviteeUser;

    // Send the email
    try {
      const resend = new Resend(process.env.AUTH_RESEND_KEY);

      await resend.emails.send({
        from: 'GovernApp <onboarding@jeremycameron.com>',
        to: invitation.inviteeEmail,
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
            inviteLink={`${process.env.SITE_URL}/invitation/${args.invitationId}`}
            organisationImageUrl={activeOrganisation.imageUrl}
            organisationName={activeOrganisation.name}
          />
        ),
      });
    } catch (error) {
      console.error('Error sending invitation email:', error);

      throw new Error('Failed to send invitation email');
    }
  },
});
