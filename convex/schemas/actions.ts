import { defineTable } from 'convex/server';
import { v } from 'convex/values';
import { risks } from './frameworks';

export const statuses = [
  'not-started',
  'in-progress',
  'completed',
  'blocked',
] as const;

export const actionTables = {
  actions: defineTable({
    text: v.string(),
    risk: v.union(...risks.map(v.literal)),
    status: v.union(...statuses.map(v.literal)),
    dueDate: v.number(),
    numComments: v.number(),
    assigneeUserId: v.optional(v.id('users')),
    assessmentId: v.id('assessments'),
    modelSolutionUrl: v.optional(v.string()),
    modelSolutionFilename: v.optional(v.string()),
    questionId: v.id('questions'),
  })
    .index('by_assessment', ['assessmentId'])
    .index('by_assessment_risk', ['assessmentId', 'risk']),
  actionComments: defineTable({
    content: v.string(),
    userId: v.id('users'),
    actionId: v.id('actions'),
  }).index('by_action', ['actionId']),
};
