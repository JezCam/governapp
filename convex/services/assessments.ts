import { v } from 'convex/values';
import type { Id } from '../_generated/dataModel';
import {
  type MutationCtx,
  mutation,
  type QueryCtx,
  query,
} from '../_generated/server';
import {
  listUserAssessmentsByAssessmentId,
  listUserAssessmentsByUserId,
  mapUserAssessmentsWithUser,
} from '../data/userAssessments';
import { createConvexError } from '../errors';
import { getActiveOrganisationId } from './organisations';
import { getCurrentUserId } from './users';

// Helpers
export async function listAssessmentsWithDataByAssessmentIds(
  ctx: QueryCtx | MutationCtx,
  assessmentIds: Id<'assessments'>[]
) {
  return await Promise.all(
    assessmentIds.map(async (assessmentId) => {
      const assessment = await ctx.db.get(assessmentId);
      if (!assessment) {
        throw createConvexError('ASSESSMENT_NOT_FOUND');
      }

      const framework = await ctx.db.get(assessment.frameworkId);
      if (!framework) {
        throw createConvexError('FRAMEWORK_NOT_FOUND');
      }

      const userAssessments = await listUserAssessmentsByAssessmentId(
        ctx,
        assessmentId
      );

      const userAssessmentsWithUser = await mapUserAssessmentsWithUser(
        ctx,
        userAssessments
      );

      return {
        ...assessment,
        framework,
        userAssessmentsWithUser,
      };
    })
  );
}

// Queries

export const listForActiveOrganisationWithFrameworkAndUserAssessmentsWithUser =
  query({
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
      const assessmentIds = userAssessmentsFilteredByOrganisation.map(
        (ua) => ua.assessmentId
      );
      return await listAssessmentsWithDataByAssessmentIds(ctx, assessmentIds);
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
          questionIndex: 0,
        })
      )
    );
  },
});
