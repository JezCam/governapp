import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function listSectionsByDomainId(
  ctx: QueryCtx | MutationCtx,
  domainId: Id<'domains'>
) {
  return await ctx.db
    .query('sections')
    .withIndex('by_domain', (q) => q.eq('domainId', domainId))
    .collect();
}
