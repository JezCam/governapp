import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function listSubscriptionsByOrganisationId(
  ctx: QueryCtx | MutationCtx,
  organisationId: Id<'organisations'>
) {
  return await ctx.db
    .query('subscriptions')
    .withIndex('by_organisation', (q) => q.eq('organisationId', organisationId))
    .collect();
}
