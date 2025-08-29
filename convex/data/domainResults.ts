import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function listDomainResultsByAssessmentId(
  ctx: QueryCtx | MutationCtx,
  assessmentId: Id<'assessments'>
) {
  return await ctx.db
    .query('domainResults')
    .withIndex('by_assessment', (q) => q.eq('assessmentId', assessmentId))
    .collect();
}
