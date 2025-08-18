import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const types = [
  'Australian Public Company Limited by guarantee',
  'Incorporated Association',
  'Australian Private Company',
  'Other',
] as const;

export const turnoverRanges = [
  '$0 - $50,000',
  '$50,001 - $250,000',
  '$250,001 - $1m',
  '$1m - $10m',
  '$10m - $100m',
  '$100m+',
] as const;

export const organisationTables = {
  organisations: defineTable({
    createdByUserId: v.id('users'),
    abnOrAcn: v.string(),
    imageUrl: v.optional(v.string()),
    name: v.string(),
    type: v.optional(v.union(...types.map(v.literal))),
    turnoverRange: v.union(...turnoverRanges.map(v.literal)),
  }).index('by_abnOrAcn', ['abnOrAcn']),
  memberships: defineTable({
    organisationId: v.id('organisations'),
    userId: v.id('users'),
    role: v.string(),
    isAdmin: v.boolean(),
  }).index('by_organisation_user', ['organisationId', 'userId']),
  invitations: defineTable({
    invitedByUserId: v.id('users'),
    organisationId: v.id('organisations'),
    inviteeEmail: v.string(),
    status: v.union(
      v.literal('pending'),
      v.literal('accepted'),
      v.literal('declined')
    ),
    role: v.string(),
    isAdmin: v.boolean(),
  })
    .index('by_inviteeEmail_status', ['inviteeEmail', 'status'])
    .index('by_organisation_email', ['organisationId', 'inviteeEmail'])
    .index('by_organisation_status', ['organisationId', 'status']),
};
