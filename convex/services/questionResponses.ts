import { v } from 'convex/values';
import { mutation } from '../_generated/server';
import { getQuestionResponseByUserAssessmentIdAndQuestionId } from '../data/questionResponses';
import { createConvexError } from '../errors';

// Mutations

export const createOrUpdate = mutation({
  args: {
    userAssessmentId: v.id('userAssessments'),
    questionId: v.id('questions'),
    responseOptionId: v.id('responseOptions'),
    nextDomainIndex: v.optional(v.number()),
    nextSectionIndex: v.optional(v.number()),
    nextQuestionIndex: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
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
      userAssessmentId: args.userAssessmentId,
      questionId: args.questionId,
      responseOptionId: args.responseOptionId,
    });

    // Update the userAssessment's progress
    const userAssessment = await ctx.db.get(args.userAssessmentId);
    if (!userAssessment) {
      throw createConvexError('USER_ASSESSMENT_NOT_FOUND');
    }

    await ctx.db.patch(args.userAssessmentId, {
      ...(args.nextDomainIndex && { domainIndex: args.nextDomainIndex }),
      ...(args.nextSectionIndex && { sectionIndex: args.nextSectionIndex }),
      ...(args.nextQuestionIndex && { questionIndex: args.nextQuestionIndex }),
      questionNumber: (userAssessment.questionNumber || 0) + 1,
      ...(userAssessment.status === 'not-started' && { status: 'in-progress' }),
    });

    // Update the assessment's status to in-progress if it was not-started
    const assessment = await ctx.db.get(userAssessment.assessmentId);
    if (!assessment) {
      throw createConvexError('ASSESSMENT_NOT_FOUND');
    }
    if (assessment.status === 'not-started') {
      await ctx.db.patch(userAssessment.assessmentId, {
        status: 'in-progress',
      });
    }
  },
});
