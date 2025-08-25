import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function getQuestionResponseByUserAssessmentIdAndQuestionId(
  ctx: QueryCtx | MutationCtx,
  userAssessmentId: Id<'userAssessments'>,
  questionId: Id<'questions'>
) {
  return await ctx.db
    .query('questionResponses')
    .withIndex('by_user_assessment_question', (q) =>
      q.eq('userAssessmentId', userAssessmentId).eq('questionId', questionId)
    )
    .first();
}
