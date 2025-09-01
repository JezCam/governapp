import { defineTable } from 'convex/server';
import { v } from 'convex/values';
import { risks } from './frameworks';

export const reportTables = {
  domainResults: defineTable({
    maxScore: v.number(),
    actualScore: v.number(),
    calculatedScore: v.number(),
    risk: v.union(...risks.map(v.literal)),
    feedback: v.string(),
    assessmentId: v.id('assessments'),
    domainId: v.id('domains'),
  }).index('by_assessment', ['assessmentId']),
  sectionResults: defineTable({
    maxScore: v.number(),
    actualScore: v.number(),
    calculatedScore: v.number(),
    risk: v.union(...risks.map(v.literal)),
    feedback: v.string(),
    assessmentId: v.id('assessments'),
    domainId: v.id('domains'),
    sectionId: v.id('sections'),
  })
    .index('by_assessment', ['assessmentId'])
    .index('by_assessment_domain', ['assessmentId', 'domainId']),
  questionResults: defineTable({
    averagedScore: v.number(),
    risk: v.union(...risks.map(v.literal)),
    feedback: v.string(),
    assessmentId: v.id('assessments'),
    sectionId: v.id('sections'),
    questionId: v.id('questions'),
    nearestResponseOptionId: v.id('responseOptions'),
  })
    .index('by_assessment', ['assessmentId'])
    .index('by_assessment_section', ['assessmentId', 'sectionId']),
};
