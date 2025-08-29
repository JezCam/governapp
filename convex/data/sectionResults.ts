import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function listSectionResultsByAssessmentId(
  ctx: QueryCtx | MutationCtx,
  assessmentId: Id<'assessments'>
) {
  return await ctx.db
    .query('sectionResults')
    .withIndex('by_assessment', (q) => q.eq('assessmentId', assessmentId))
    .collect();
}
