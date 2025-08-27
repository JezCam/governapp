import { defineTable } from 'convex/server';
import { v } from 'convex/values';
import { riskLevels } from './frameworks';

export const assessmentTables = {
  assessments: defineTable({
    name: v.string(),
    status: v.union(
      v.literal('not-started'),
      v.literal('in-progress'),
      v.literal('completed')
    ),
    maxScore: v.number(),
    actualScore: v.number(),
    calculatedScore: v.number(),
    riskLevel: v.optional(v.union(...riskLevels)),
    feedback: v.optional(v.string()),
    startDate: v.number(),
    dueDate: v.number(),
    finishDate: v.optional(v.number()),
    questionsTotal: v.number(),
    createdBy: v.id('users'),
    frameworkId: v.id('frameworks'),
    selectedDomainIds: v.array(v.id('domains')),
    organisationId: v.optional(v.id('organisations')),
  })
    .index('by_organisation', ['organisationId'])
    .index('by_organisation_status', ['organisationId', 'status']),
  userAssessments: defineTable({
    status: v.union(
      v.literal('not-started'),
      v.literal('in-progress'),
      v.literal('completed')
    ),
    startDate: v.number(),
    finishDate: v.optional(v.number()),
    questionIndex: v.number(),
    assessmentId: v.id('assessments'),
    organisationId: v.optional(v.id('organisations')),
    frameworkId: v.id('frameworks'),
    userId: v.id('users'),
  })
    .index('by_user', ['userId'])
    .index('by_assessment', ['assessmentId'])
    .index('by_user_organisation', ['userId', 'organisationId']),
  questionResponses: defineTable({
    userAssessmentId: v.id('userAssessments'),
    questionId: v.id('questions'),
    responseOptionId: v.id('responseOptions'),
  })
    .index('by_user_assessment_question', ['userAssessmentId', 'questionId'])
    .index('by_user_assessment', ['userAssessmentId']),
};
