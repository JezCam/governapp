import { v } from 'convex/values';
import { mutation } from '../_generated/server';
import { getQuestionResponseByUserAssessmentIdAndQuestionId } from '../data/questionResponses';
import { createConvexError } from '../errors';
import { getCurrentUserId } from './users';

// Mutations

export const createOrUpdate = mutation({
  args: {
    userAssessmentId: v.id('userAssessments'),
    questionId: v.id('questions'),
    responseOptionId: v.id('responseOptions'),
    questionIndex: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Ensure the userAssessment belongs to the current user
    const currentUserId = await getCurrentUserId(ctx);
    const userAssessment = await ctx.db.get(args.userAssessmentId);

    if (!userAssessment) {
      throw createConvexError('USER_ASSESSMENT_NOT_FOUND');
    }

    if (userAssessment.userId !== currentUserId) {
      throw createConvexError('NOT_USER_ASSESSMENT_USER');
    }

    const assessment = await ctx.db.get(userAssessment.assessmentId);
    if (!assessment) {
      throw createConvexError('ASSESSMENT_NOT_FOUND');
    }

    // Check if a response already exists for this userAssessmentId and questionId
    const existingResponses =
      await getQuestionResponseByUserAssessmentIdAndQuestionId(
        ctx,
        args.userAssessmentId,
        args.questionId
      );

    if (existingResponses) {
      // Update the existing response
      return await ctx.db.patch(existingResponses._id, {
        responseOptionId: args.responseOptionId,
      });
    }

    // Create a new response
    await ctx.db.insert('questionResponses', {
      assessmentId: assessment._id,
      userAssessmentId: userAssessment._id,
      questionId: args.questionId,
      responseOptionId: args.responseOptionId,
    });

    // Update the userAssessment's progress
    if (args.questionIndex === undefined) {
      return;
    }

    await ctx.db.patch(args.userAssessmentId, {
      questionIndex: args.questionIndex,
      ...(userAssessment.status === 'not-started' && { status: 'in-progress' }),
    });

    // Update the assessment's status to in-progress if it was not-started
    if (assessment.status === 'not-started') {
      await ctx.db.patch(userAssessment.assessmentId, {
        status: 'in-progress',
      });
    }
  },
});
