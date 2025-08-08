import { ConvexError } from 'convex/values';
import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { getActiveOrganisationId } from './organisation';

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
  );
  const filteredMemberships = membershipsWithUsers.filter((m) => m !== null);
  if (filteredMemberships.length === 0) {
    throw new ConvexError('no_memberships_with_users_in_organisation');
  }
  return filteredMemberships;
}

export async function getMembershipsByUserId(
  ctx: QueryCtx | MutationCtx,
  userId: Id<'users'>
) {
  const memberships = await ctx.db
    .query('memberships')
    .filter((q) => q.eq(q.field('userId'), userId))
    .collect();

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
