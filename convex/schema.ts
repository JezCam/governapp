import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { actionTables } from './schemas/actions';
import { assessmentTables } from './schemas/assessments';
import { frameworkTables } from './schemas/frameworks';
import { organisationTables } from './schemas/organisations';
import { reportTables } from './schemas/reports';

const schema = defineSchema({
  ...authTables,
  ...organisationTables,
  ...frameworkTables,
  ...assessmentTables,
  ...reportTables,
  ...actionTables,
  users: defineTable({
    name: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),

    activeOrganisationId: v.optional(v.id('organisations')),
    imageUrl: v.optional(v.string()),
    onboardingStep: v.optional(v.number()),

    // other "users" fields...
  }).index('email', ['email']),
  // Your other tables...
});

export default schema;
