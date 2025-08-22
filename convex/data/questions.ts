import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function listQuestionsBySectionId(
  ctx: QueryCtx | MutationCtx,
  sectionId: Id<'sections'>
) {
  return await ctx.db
    .query('questions')
    .withIndex('by_section', (q) => q.eq('sectionId', sectionId))
    .collect();
}
