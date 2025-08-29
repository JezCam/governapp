import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function listQuestionResultsByAssessmentId(
  ctx: QueryCtx | MutationCtx,
  assessmentId: Id<'assessments'>
) {
  return await ctx.db
    .query('questionResults')
    .withIndex('by_assessment', (q) => q.eq('assessmentId', assessmentId))
    .collect();
}

export async function listQuestionResultsByAssessmentAndSectionId(
  ctx: QueryCtx | MutationCtx,
  assessmentId: Id<'assessments'>,
  sectionId: Id<'sections'>
) {
  return await ctx.db
    .query('questionResults')
    .withIndex('by_assessment_section', (q) =>
      q.eq('assessmentId', assessmentId).eq('sectionId', sectionId)
    )
    .collect();
}
