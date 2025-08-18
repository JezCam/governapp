import { ConvexError } from 'convex/values';
import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { getActiveOrganisationId } from './organisations';
import { getCurrentUserId } from './users';

export async function getMembershipByUserIdAndOrganisationId(
  ctx: QueryCtx | MutationCtx,
  userId: Id<'users'>,
  organisationId: Id<'organisations'>
) {
  const membership = await ctx.db
    .query('memberships')
    .withIndex('by_organisation_user', (q) =>
      q.eq('organisationId', organisationId).eq('userId', userId)
    )
    .first();

  if (!membership) {
    throw new ConvexError('membership_not_found');
  }

  return membership;
}

export async function getMembershipsByOrganisationId(
  ctx: QueryCtx | MutationCtx,
  organisationId: Id<'organisations'>
) {
  const memberships = await ctx.db
    .query('memberships')
    .filter((q) => q.eq(q.field('organisationId'), organisationId))
    .collect();

  return memberships;
}

export async function getMembershipsInActiveOrganisation(
  ctx: QueryCtx | MutationCtx
) {
  const activeOrganisationId = await getActiveOrganisationId(ctx);
  const memberships = await getMembershipsByOrganisationId(
    ctx,
    activeOrganisationId
  );

  if (memberships.length === 0) {
    throw new ConvexError('no_memberships_in_organisation');
  }

  return memberships;
}

export async function getMembershipsInActiveOrganisationWithUsers(
  ctx: QueryCtx | MutationCtx
) {
  const memberships = await getMembershipsInActiveOrganisation(ctx);
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
    throw new ConvexError('no_memberships_with_users_in_organisation');
  }

  return membershipsWithUsers;
}

export async function getMembershipsByUserId(
  ctx: QueryCtx | MutationCtx,
  userId: Id<'users'>
) {
  const memberships = await ctx.db
    .query('memberships')
    .filter((q) => q.eq(q.field('userId'), userId))
    .collect();

  if (memberships.length === 0) {
    throw new ConvexError('no_memberships_for_user');
  }

  return memberships;
}

export async function getMembershipsForCurrentUser(
  ctx: QueryCtx | MutationCtx
) {
  const userId = await getCurrentUserId(ctx);
  const memberships = await getMembershipsByUserId(ctx, userId);
  return memberships;
}

export async function createMembership(
  ctx: MutationCtx,
  userId: Id<'users'>,
  organisationId: Id<'organisations'>,
  role: string,
  isAdmin: boolean
) {
  const membership = await ctx.db.insert('memberships', {
    userId,
    organisationId,
    role,
    isAdmin,
  });

  return membership;
}
