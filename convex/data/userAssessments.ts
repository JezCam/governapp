import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function getUserAssessmentsByUserId(
  ctx: QueryCtx | MutationCtx,
  userId: Id<'users'>
) {
  return await ctx.db
    .query('userAssessments')
    .withIndex('by_user', (q) => q.eq('userId', userId))
    .collect();
}
