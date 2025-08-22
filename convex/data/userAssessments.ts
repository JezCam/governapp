import type { DataModel, Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { createConvexError } from '../errors';

export async function mapUserAssessmentsWithUser(
  ctx: QueryCtx | MutationCtx,
  userAssessments: DataModel['userAssessments']['document'][]
) {
  return await Promise.all(
    userAssessments.map(async (userAssessment) => {
      const user = await ctx.db.get(userAssessment.userId);
      if (!user) {
        throw createConvexError('USER_NOT_FOUND');
      }
      return {
        ...userAssessment,
        user,
      };
    })
  );
}

export async function listUserAssessmentsByUserId(
  ctx: QueryCtx | MutationCtx,
  userId: Id<'users'>
) {
  return await ctx.db
    .query('userAssessments')
    .withIndex('by_user', (q) => q.eq('userId', userId))
    .collect();
}

export async function listUserAssessmentsByAssessmentId(
  ctx: QueryCtx | MutationCtx,
  assessmentId: Id<'assessments'>
) {
  return await ctx.db
    .query('userAssessments')
    .withIndex('by_assessment', (q) => q.eq('assessmentId', assessmentId))
    .collect();
}
