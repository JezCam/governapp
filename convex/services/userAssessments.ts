import { v } from 'convex/values';
import { mutation } from '../_generated/server';
import { listUserAssessmentsByAssessmentId } from '../data/userAssessments';
import { createConvexError } from '../errors';
import { generateAssessmentReportAndActions } from './assessments';

export const complete = mutation({
  args: { userAssessmentId: v.id('userAssessments') },
  handler: async (ctx, { userAssessmentId }) => {
    const userAssessment = await ctx.db.get(userAssessmentId);
    if (!userAssessment) {
      throw createConvexError('USER_ASSESSMENT_NOT_FOUND');
    }

    await ctx.db.patch(userAssessmentId, { status: 'completed' });

    // If this is the last user assessment for the assessment then mark the assessment as closed
    const otherUserAssessments = await listUserAssessmentsByAssessmentId(
      ctx,
      userAssessment.assessmentId
    ).then((uas) => uas.filter((ua) => ua._id !== userAssessmentId));

    // This will be true for an empty array, meaning this was the only user assessment
    if (otherUserAssessments.every((ua) => ua.status === 'completed')) {
      await generateAssessmentReportAndActions(
        ctx,
        userAssessment.assessmentId
      );
    }
  },
});
