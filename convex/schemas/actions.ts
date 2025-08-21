import { defineTable } from 'convex/server';
import { v } from 'convex/values';
import { riskLevels } from './frameworks';

export const actionTables = {
  actions: defineTable({
    text: v.string(),
    riskLevel: v.union(...riskLevels),
    status: v.union(
      v.literal('not-started'),
      v.literal('in-progress'),
      v.literal('completed'),
      v.literal('blocked')
    ),
    dueDate: v.number(),
    numComments: v.number(),
    assigneeUserId: v.optional(v.id('users')),
    assessmentId: v.id('assessments'),
    modelSolutionUrl: v.optional(v.string()),
    modelSolutionFilename: v.optional(v.string()),
    questionId: v.id('questions'),
  }).index('by_assessment', ['assessmentId']),
  actionComments: defineTable({
    content: v.string(),
    userId: v.id('users'),
    actionId: v.id('actions'),
  }).index('by_action', ['actionId']),
};
