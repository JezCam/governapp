import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function listActionCommentsByActionId(
  ctx: QueryCtx | MutationCtx,
  actionId: Id<'actions'>
) {
  return await ctx.db
    .query('actionComments')
    .withIndex('by_action', (q) => q.eq('actionId', actionId))
    .collect();
}
