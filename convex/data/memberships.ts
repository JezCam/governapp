import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

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

  return membership;
}

export async function listMembershipsByOrganisationId(
  ctx: QueryCtx | MutationCtx,
  organisationId: Id<'organisations'>
) {
  const memberships = await ctx.db
    .query('memberships')
    .filter((q) => q.eq(q.field('organisationId'), organisationId))
    .collect();

  return memberships;
}

export async function listMembershipsByOrganisationIdWithUsers(
  ctx: QueryCtx | MutationCtx,
  organisationId: Id<'organisations'>
) {
  const memberships = await listMembershipsByOrganisationId(
    ctx,
    organisationId
  );
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

  return membershipsWithUsers;
}

export async function listMembershipsByUserId(
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
  data: { role: string; isAdmin: boolean; isCreator: boolean }
) {
  const membership = await ctx.db.insert('memberships', {
    userId,
    organisationId,
    ...data,
  });

  return membership;
}
