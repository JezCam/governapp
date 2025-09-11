import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import type { turnoverRanges, types } from '../schemas/organisations';

export async function getOrganisationByAbnOrAcn(
  ctx: QueryCtx | MutationCtx,
  abnOrAcn: string
) {
  const organisation = await ctx.db
    .query('organisations')
    .withIndex('by_abnOrAcn', (q) => q.eq('abnOrAcn', abnOrAcn))
    .first();

  return organisation;
}

export async function createOrganisationAndMembership(
  ctx: MutationCtx,
  data: {
    creatorUserId: Id<'users'>;
    abnOrAcn: string;
    name: string;
    type: (typeof types)[number];
    turnoverRange: (typeof turnoverRanges)[number];
    role: string;
  }
) {
  const organisationId = await ctx.db.insert('organisations', {
    name: data.name,
    type: data.type,
    turnoverRange: data.turnoverRange,
    abnOrAcn: data.abnOrAcn,
    active: false,
  });

  await ctx.db.insert('memberships', {
    organisationId,
    userId: data.creatorUserId,
    role: data.role,
    isAdmin: true,
    isCreator: true,
  });

  await ctx.db.patch(data.creatorUserId, {
    activeOrganisationId: organisationId,
  });

  return organisationId;
}
