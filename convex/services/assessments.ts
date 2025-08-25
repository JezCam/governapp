import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import {
  listUserAssessmentsByAssessmentId,
  listUserAssessmentsByUserId,
  mapUserAssessmentsWithUser,
} from '../data/userAssessments';
import { createConvexError } from '../errors';
import { mapDomainsWithSections } from './domains';
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
            currentUserAssessmentId: ua._id,
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

    const assessment = await ctx.db.get(userAssessment.assessmentId);
    if (!assessment) {
      throw createConvexError('ASSESSMENT_NOT_FOUND');
    }

    const framework = await ctx.db.get(userAssessment.frameworkId);
    if (!framework) {
      throw createConvexError('FRAMEWORK_NOT_FOUND');
    }

    const domains = (
      await Promise.all(
        assessment.selectedDomainIds.map((domainId) => ctx.db.get(domainId))
      )
    ).filter((d) => d !== null);

    const domainsWithSections = await mapDomainsWithSections(
      ctx,
      domains,
      args.userAssessmentId
    );

    return {
      ...assessment,
      userAssessment,
      framework: { ...framework, domains: domainsWithSections },
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

    if (!args.participantsUserIds) {
      args.participantsUserIds = [currentUserId];
    }

    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    const assessment = await ctx.db.insert('assessments', {
      name: args.name,
      status: 'not-started',
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
          domainIndex: 0,
          sectionIndex: 0,
          questionIndex: 0,
          questionNumber: 0,
        })
      )
    );
  },
});
