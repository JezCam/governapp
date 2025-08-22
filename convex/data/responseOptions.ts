import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function listResponseOptionsByQuestionId(
  ctx: QueryCtx | MutationCtx,
  questionId: Id<'questions'>
) {
  return await ctx.db
    .query('responseOptions')
    .withIndex('by_question', (q) => q.eq('questionId', questionId))
    .collect();
}
