import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import {
  getQuestionResponseByUserAssessmentIdAndQuestionId,
  listQuestionResponsesByUserAssessmentId,
} from '../data/questionResponses';
import { listQuestionsBySectionId } from '../data/questions';
import { listResponseOptionsByQuestionId } from '../data/responseOptions';
import {
  listUserAssessmentsByAssessmentId,
  listUserAssessmentsByUserId,
  mapUserAssessmentsWithUser,
} from '../data/userAssessments';
import { createConvexError } from '../errors';
import { mapDomainsWithSections } from './domains';
import { isAdminByCurrentUserAndActiveOrganisation } from './memberships';
import { getActiveOrganisationId } from './organisations';
import { getCurrentUserId } from './users';

// Queries

export const listForActiveOrganisation = query({
  handler: async (ctx) => {
    const currentUserId = await getCurrentUserId(ctx);
    const activeOrganisationId = await getActiveOrganisationId(ctx);
    const userAsssessments = await listUserAssessmentsByUserId(
      ctx,
      currentUserId
    );
    const userAssessmentsFilteredByOrganisation = userAsssessments.filter(
      (ua) => !ua.organisationId || ua.organisationId === activeOrganisationId
    );

    return (
      await Promise.all(
        userAssessmentsFilteredByOrganisation.map(async (ua) => {
          const assessment = await ctx.db.get(ua.assessmentId);
          if (!assessment) {
            throw createConvexError('ASSESSMENT_NOT_FOUND');
          }

          const framework = await ctx.db.get(ua.frameworkId);
          if (!framework) {
            throw createConvexError('FRAMEWORK_NOT_FOUND');
          }

          const userAssessments = await listUserAssessmentsByAssessmentId(
            ctx,
            ua.assessmentId
          );

          const userAssessmentsWithUser = await mapUserAssessmentsWithUser(
            ctx,
            userAssessments
          );

          return {
            ...assessment,
            currentUserAssessment: ua,
            framework,
            userAssessments: userAssessmentsWithUser,
          };
        })
      )
    ).filter((a) => a !== null);
  },
});

export const getByUserAssessmentId = query({
  args: { userAssessmentId: v.id('userAssessments') },
  handler: async (ctx, args) => {
    const userAssessment = await ctx.db.get(args.userAssessmentId);
    if (!userAssessment) {
      throw createConvexError('USER_ASSESSMENT_NOT_FOUND');
    }

    const currentUserId = await getCurrentUserId(ctx);
    if (userAssessment.userId !== currentUserId) {
      throw createConvexError('NOT_USER_ASSESSMENT_USER');
    }

    const assessment = await ctx.db.get(userAssessment.assessmentId);
    if (!assessment) {
      throw createConvexError('ASSESSMENT_NOT_FOUND');
    }

    const framework = await ctx.db.get(userAssessment.frameworkId);
    if (!framework) {
      throw createConvexError('FRAMEWORK_NOT_FOUND');
    }

    // Get all domains for this assessment
    const domainsData = (
      await Promise.all(
        assessment.selectedDomainIds.map((domainId) => ctx.db.get(domainId))
      )
    )
      .filter((d) => d !== null)
      .sort((a, b) => a.order - b.order);

    const domains = await mapDomainsWithSections(ctx, domainsData);

    // Get all questions with domain and section indexes
    const questionsData = (
      await Promise.all(
        domains.map(async (domain, d) =>
          (
            await Promise.all(
              domain.sections.map(async (section, s) =>
                (
                  await listQuestionsBySectionId(ctx, section._id)
                )
                  .sort((a, b) => a.order - b.order)
                  .map((question, q) => ({
                    ...question,
                    domainIndex: d,
                    sectionIndex: s,
                    questionIndex: q,
                  }))
              )
            )
          ).flat()
        )
      )
    ).flat();

    // Map questions with response options and existing responses
    const questions = await Promise.all(
      questionsData.map(async (question) => {
        const responseOptions = await listResponseOptionsByQuestionId(
          ctx,
          question._id
        );

        const existingResponse =
          await getQuestionResponseByUserAssessmentIdAndQuestionId(
            ctx,
            userAssessment._id,
            question._id
          );

        return {
          ...question,
          responseOptions,
          ...(existingResponse && {
            existingResponseOptionId: existingResponse.responseOptionId,
          }),
        };
      })
    );

    return {
      ...assessment,
      framework,
      domains,
      questions,
      userAssessment,
    };
  },
});

export const getNameByUserAssesmentId = query({
  args: { userAssessmentId: v.id('userAssessments') },
  handler: async (ctx, args) => {
    const userAssessment = await ctx.db.get(args.userAssessmentId);
    if (!userAssessment) {
      throw createConvexError('USER_ASSESSMENT_NOT_FOUND');
    }

    const currentUserId = await getCurrentUserId(ctx);
    if (userAssessment.userId !== currentUserId) {
      throw createConvexError('NOT_USER_ASSESSMENT_USER');
    }

    const assessment = await ctx.db.get(userAssessment.assessmentId);
    if (!assessment) {
      throw createConvexError('ASSESSMENT_NOT_FOUND');
    }

    return assessment.name;
  },
});

// Mutations

export const create = mutation({
  args: {
    name: v.string(),
    frameworkId: v.id('frameworks'),
    selectedDomainIds: v.array(v.id('domains')),
    questionsTotal: v.number(),
    participantsUserIds: v.optional(v.array(v.id('users'))),
    startDate: v.optional(v.number()),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const currentUserId = await getCurrentUserId(ctx);
    const activeOrganisationId = await getActiveOrganisationId(ctx);

    const type = args.participantsUserIds ? 'board' : 'self';

    if (type === 'board') {
      // Check user is admin of organisation
      const isAdmin = await isAdminByCurrentUserAndActiveOrganisation(ctx);
      if (!isAdmin) {
        throw createConvexError('NOT_ADMIN_OF_ORGANISATION');
      }
    }

    if (!args.participantsUserIds) {
      args.participantsUserIds = [currentUserId];
    }

    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    const assessment = await ctx.db.insert('assessments', {
      name: args.name,
      status: 'not-started',
      type,
      maxScore: 0,
      actualScore: 0,
      calculatedScore: 0,
      startDate: args.startDate ?? Date.now(),
      dueDate: args.dueDate ?? threeMonthsFromNow.getTime(),
      createdBy: currentUserId,
      frameworkId: args.frameworkId,
      ...(type === 'board' && { organisationId: activeOrganisationId }),
      selectedDomainIds: args.selectedDomainIds,
      questionsTotal: args.questionsTotal,
    });

    await Promise.all(
      args.participantsUserIds.map((userId) =>
        ctx.db.insert('userAssessments', {
          userId,
          assessmentId: assessment,
          frameworkId: args.frameworkId,
          ...(type === 'board' && { organisationId: activeOrganisationId }),
          status: 'not-started',
          startDate: Date.now(),
          questionIndex: 0,
        })
      )
    );
  },
});

export const deleteById = mutation({
  args: { assessmentId: v.id('assessments') },
  handler: async (ctx, args) => {
    const assessment = await ctx.db.get(args.assessmentId);
    if (!assessment) {
      throw createConvexError('ASSESSMENT_NOT_FOUND');
    }

    const userAssessments = await listUserAssessmentsByAssessmentId(
      ctx,
      args.assessmentId
    );

    const questionResponses = (
      await Promise.all(
        userAssessments.map(
          async (ua) =>
            await listQuestionResponsesByUserAssessmentId(ctx, ua._id)
        )
      )
    ).flat();

    // Delete everything
    await Promise.all(
      questionResponses.map(async (qr) => await ctx.db.delete(qr._id))
    );
    await Promise.all(userAssessments.map(async (ua) => ctx.db.delete(ua._id)));
    await ctx.db.delete(args.assessmentId);
  },
});
