import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const riskLevels = [
  v.literal('black'),
  v.literal('red'),
  v.literal('amber'),
  v.literal('green'),
];

export const frameworkTables = {
  frameworks: defineTable({
    name: v.string(),
    type: v.union(v.literal('self'), v.literal('board')),
    summary: v.string(),
    description: v.string(),
    blackMax: v.number(),
    redMax: v.number(),
    amberMax: v.number(),
    reportBlack: v.string(),
    reportRed: v.string(),
    reportAmber: v.string(),
    reportGreen: v.string(),
    legislation: v.optional(v.string()),
    authority: v.string(),
    monthlyCost: v.number(),
  }).index('by_type', ['type']),
  domains: defineTable({
    order: v.number(),
    name: v.string(),
    description: v.string(),
    questionsTotal: v.number(),
    blackMax: v.number(),
    redMax: v.number(),
    amberMax: v.number(),
    reportBlack: v.string(),
    reportRed: v.string(),
    reportAmber: v.string(),
    reportGreen: v.string(),
    frameworkId: v.id('frameworks'),
  }).index('by_framework', ['frameworkId']),
  sections: defineTable({
    order: v.number(),
    name: v.string(),
    description: v.string(),
    questionsTotal: v.number(),
    blackMax: v.number(),
    redMax: v.number(),
    amberMax: v.number(),
    reportBlack: v.string(),
    reportRed: v.string(),
    reportAmber: v.string(),
    reportGreen: v.string(),
    domainId: v.id('domains'),
    frameworkId: v.id('frameworks'),
  }).index('by_domain', ['domainId']),
  questions: defineTable({
    order: v.number(),
    text: v.string(),
    explanatory: v.string(),
    weight: v.number(),
    modelSolutionUrl: v.optional(v.string()),
    modelSolutionFilename: v.optional(v.string()),
    modelSolutionAuthority: v.optional(v.string()),
    frameworkId: v.id('frameworks'),
    domainId: v.id('domains'),
    sectionId: v.id('sections'),
  })
    .index('by_framework_order', ['frameworkId', 'order'])
    .index('by_domain', ['domainId'])
    .index('by_section', ['sectionId']),
  responseOptions: defineTable({
    text: v.string(),
    score: v.number(),
    riskLevel: v.union(...riskLevels),
    order: v.number(),
    isValidNA: v.boolean(),
    triggersAction: v.boolean(),
    actionText: v.optional(v.string()),
    questionId: v.id('questions'),
  }).index('by_question', ['questionId']),
  subscriptions: defineTable({
    userId: v.id('users'),
    organisationId: v.id('organisations'),
    frameworkId: v.id('frameworks'),
    subscribedAt: v.number(),
  }).index('by_organisation', ['organisationId']),
};
