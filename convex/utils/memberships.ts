import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { getActiveOrganisationId } from './organisation';
import { getUserById } from './users';

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
  return getMembershipsByOrganisationId(ctx, activeOrganisationId);
}

export async function getMembershipsInActiveOrganisationWithUsers(
  ctx: QueryCtx | MutationCtx
) {
  const memberships = await getMembershipsInActiveOrganisation(ctx);
  const membershipsWithUsers = await Promise.all(
    memberships.map(async (membership) => {
      const user = await getUserById(ctx, membership.userId);
      return {
        ...membership,
        user,
      };
    })
  );
  return membershipsWithUsers.filter((m) => m.user !== null);
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
