import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { organisationTables } from './schemas/organisationSchemas';

const schema = defineSchema({
  ...authTables,
  ...organisationTables,
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
