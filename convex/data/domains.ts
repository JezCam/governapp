import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function listDomainsByFrameworkId(
  ctx: QueryCtx | MutationCtx,
  frameworkId: Id<'frameworks'>
) {
  return await ctx.db
    .query('domains')
    .withIndex('by_framework', (q) => q.eq('frameworkId', frameworkId))
    .collect();
}
