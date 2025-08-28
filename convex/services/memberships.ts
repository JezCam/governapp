import { v } from 'convex/values';
import type { Id } from '../_generated/dataModel';
import {
  type MutationCtx,
  mutation,
  type QueryCtx,
  query,
} from '../_generated/server';
import {
  getMembershipByUserIdAndOrganisationId,
  listMembershipsByOrganisationId,
  listMembershipsByUserId,
} from '../data/memberships';
import { createConvexError } from '../errors';
import { getActiveOrganisationId } from './organisations';
import { getCurrentUserId } from './users';

// Helpers

export async function listMembershipsForCurrentUser(
  ctx: QueryCtx | MutationCtx
) {
  const currentUserId = await getCurrentUserId(ctx);
  const memberships = await listMembershipsByUserId(ctx, currentUserId);

  if (memberships.length === 0) {
    throw createConvexError('NO_MEMBERSHIPS_FOUND');
  }

  return memberships;
}

export async function listMembershipsInActiveOrganisation(
  ctx: QueryCtx | MutationCtx
) {
  const activeOrganisationId = await getActiveOrganisationId(ctx);
  const memberships = await listMembershipsByOrganisationId(
    ctx,
    activeOrganisationId
  );

  if (memberships.length === 0) {
    throw createConvexError('NO_MEMBERSHIPS_FOUND');
  }

  return memberships;
}

export async function isAdminByUserIdAndOrganisationId(
  ctx: QueryCtx | MutationCtx,
  userId: Id<'users'>,
  organisationId: Id<'organisations'>
) {
  const membership = await getMembershipByUserIdAndOrganisationId(
    ctx,
    userId,
    organisationId
  );

  if (!membership) {
    throw createConvexError('MEMBERSHIP_NOT_FOUND');
  }

  return membership.isAdmin;
}

export async function isAdminByCurrentUserAndActiveOrganisation(
  ctx: QueryCtx | MutationCtx
) {
  const currentUserId = await getCurrentUserId(ctx);
  const activeOrganisationId = await getActiveOrganisationId(ctx);

  const isAdmin = await isAdminByUserIdAndOrganisationId(
    ctx,
    currentUserId,
    activeOrganisationId
  );

  return isAdmin;
}

// Queries

export const listInActiveOrganisation = query({
  handler: async (ctx) => {
    return await listMembershipsInActiveOrganisation(ctx);
  },
});

export const listInActiveOrganisationWithUsers = query({
  handler: async (ctx) => {
    const memberships = await listMembershipsInActiveOrganisation(ctx);
    const membershipsWithUsers = await Promise.all(
      memberships.map(async (membership) => {
        const user = await ctx.db.get(membership.userId);
        if (user === null) {
          return null;
        }
        return {
          ...membership,
          user,
        };
      })
    ).then((results) => results.filter((m) => m !== null));

    if (membershipsWithUsers.length === 0) {
      throw createConvexError('NO_MEMBERSHIPS_WITH_USERS_FOUND');
    }

    return membershipsWithUsers;
  },
});

export const listForCurrentUser = query({
  handler: async (ctx) => {
    return await listMembershipsForCurrentUser(ctx);
  },
});

export const listForCurrentUserWithOrganisation = query({
  handler: async (ctx) => {
    const memberships = await listMembershipsForCurrentUser(ctx);
    const membershipsWithOrganisation = await Promise.all(
      memberships.map(async (membership) => {
        const organisation = await ctx.db.get(membership.organisationId);
        if (organisation === null) {
          return null;
        }
        return {
          ...membership,
          organisation,
        };
      })
    ).then((results) => results.filter((m) => m !== null));

    if (membershipsWithOrganisation.length === 0) {
      throw createConvexError('NO_MEMBERSHIPS_WITH_ORGANISATION_FOUND');
    }

    return membershipsWithOrganisation;
  },
});

// Mutations

export const update = mutation({
  args: {
    id: v.id('memberships'),
    data: v.object({
      role: v.string(),
      isAdmin: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    const membership = await ctx.db.get(args.id);

    if (!membership) {
      throw createConvexError('MEMBERSHIP_NOT_FOUND');
    }

    // If removing admin status, ensure the user is not the organisation creator
    if (args.data.isAdmin === false && membership.isCreator) {
      throw createConvexError('CANNOT_DEMOTE_ORGANISATION_CREATOR');
    }

    await ctx.db.patch(args.id, args.data);
  },
});

export const remove = mutation({
  args: { id: v.id('memberships') },
  handler: async (ctx, args) => {
    const membership = await ctx.db.get(args.id);

    if (!membership) {
      throw createConvexError('MEMBERSHIP_NOT_FOUND');
    }

    const user = await ctx.db.get(membership.userId);
    if (!user) {
      throw createConvexError('USER_NOT_FOUND');
    }

    // If removing the organisation creator, throw an error
    if (membership.isCreator) {
      throw createConvexError('CANNOT_REMOVE_ORGANISATION_CREATOR');
    }

    // If user has no other organisations, update their onboarding step
    // Otherwise, update their active organisation
    const memberships = await listMembershipsByUserId(ctx, membership.userId);

    const otherMembership = memberships.find(
      (m) => m.organisationId !== membership.organisationId
    );

    // If the user has another membership, set it as active
    if (otherMembership) {
      await ctx.db.patch(user._id, {
        activeOrganisationId: otherMembership.organisationId,
      });
    } else {
      await ctx.db.patch(user._id, { onboardingStep: 1 });
    }

    // TODO: Email and notify the user about the removal

    await ctx.db.delete(args.id);
  },
});
