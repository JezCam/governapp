import { v } from 'convex/values';
import { XMLParser } from 'fast-xml-parser';
import { internal } from '../_generated/api';
import {
  action,
  internalQuery,
  type MutationCtx,
  mutation,
  type QueryCtx,
  query,
} from '../_generated/server';
import {
  createOrganisationAndMembership,
  getOrganisationByAbnOrAcn,
} from '../data/organisations';
import { getStorageUrl } from '../data/storage';
import { createConvexError } from '../errors';
import { turnoverRanges, types } from '../schemas/organisations';
import { getCurrentUser, getCurrentUserId } from './users';

// Helpers

export async function getActiveOrganisationId(ctx: QueryCtx | MutationCtx) {
  const currentUser = await getCurrentUser(ctx);
  const activeOrganisationId = currentUser.activeOrganisationId;
  if (!activeOrganisationId) {
    throw createConvexError('NO_ACTIVE_ORGANISATION');
  }

  return activeOrganisationId;
}

// Queries

export const getById = query({
  args: { organisationId: v.id('organisations') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.organisationId);
  },
});

export const getActive = query({
  handler: async (ctx) => {
    const activeOrganisationId = await getActiveOrganisationId(ctx);
    const activeOrganisation = await ctx.db.get(activeOrganisationId);

    if (!activeOrganisation) {
      throw createConvexError('ORGANISATION_NOT_FOUND');
    }

    return activeOrganisation;
  },
});

export const getByAbnOrAcn = internalQuery({
  args: { abnOrAcn: v.string() },
  handler: async (ctx, args) => {
    const organisation = await getOrganisationByAbnOrAcn(ctx, args.abnOrAcn);

    return organisation;
  },
});

export const isActiveActive = query({
  handler: async (ctx) => {
    const activeOrganisationId = await getActiveOrganisationId(ctx);
    const activeOrganisation = await ctx.db.get(activeOrganisationId);
    if (!activeOrganisation) {
      throw createConvexError('ORGANISATION_NOT_FOUND');
    }
    return activeOrganisation.active;
  },
});

// Mutations

export const updateById = mutation({
  args: {
    organisationId: v.id('organisations'),
    data: v.object({
      imageUrl: v.optional(v.string()),
      active: v.optional(v.boolean()),
      currentPeriodEnd: v.optional(v.number()),
      lastRenewalDate: v.optional(v.number()),
      subscriptionId: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.organisationId, args.data);
  },
});

export const updateActive = mutation({
  args: {
    data: v.object({ imageUrl: v.optional(v.string()) }),
  },
  handler: async (ctx, args) => {
    const activeOrganisationId = await getActiveOrganisationId(ctx);

    await ctx.db.patch(activeOrganisationId, args.data);
  },
});

export const updateImageForActive = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const activeOrganisationId = await getActiveOrganisationId(ctx);
    const imageUrl = await getStorageUrl(ctx, args.storageId);

    if (!imageUrl) {
      throw createConvexError('STORAGE_NOT_FOUND');
    }

    await ctx.db.patch(activeOrganisationId, {
      imageUrl,
    });
  },
});

export const setActive = mutation({
  args: { organisationId: v.id('organisations') },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);

    await ctx.db.patch(userId, { activeOrganisationId: args.organisationId });
  },
});

export const create = mutation({
  args: {
    turnoverRange: v.union(...turnoverRanges.map(v.literal)),
    abnOrAcn: v.string(),
    name: v.string(),
    type: v.union(...types.map(v.literal)),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if the user is authenticated
    const currentUserId = await getCurrentUserId(ctx);

    // Create the organisation and membership
    const organisationId = await createOrganisationAndMembership(ctx, {
      creatorUserId: currentUserId,
      abnOrAcn: args.abnOrAcn,
      name: args.name,
      type: args.type,
      turnoverRange: args.turnoverRange,
      role: args.role,
    });

    // Set the active organisation for the user
    await ctx.db.patch(currentUserId, {
      activeOrganisationId: organisationId,
    });

    // Return the created organisation
    const organisation = await ctx.db.get(organisationId);
    if (!organisation) {
      throw createConvexError('ORGANISATION_NOT_FOUND');
    }

    return organisation;
  },
});

// Action

export const getOrganisationNameAndTypeByAbnOrAcn = action({
  args: {
    abnOrAcn: v.string(),
    isAbn: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Check if existing organisation with the same ABN or ACN
    const existingOrg = await ctx.runQuery(
      internal.services.organisations.getByAbnOrAcn,
      { abnOrAcn: args.abnOrAcn }
    );
    if (existingOrg) {
      throw createConvexError('ORGANISATION_ALREADY_EXISTS');
    }

    // Get Organisation Name and Type from ABRXML API
    const url = args.isAbn
      ? `https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/ABRSearchByABN
                ?searchString=${args.abnOrAcn}&includeHistoricalDetails=N&authenticationGuid=${process.env.ABRXML_KEY}`
      : `https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/ABRSearchByASIC
                ?searchString=${args.abnOrAcn}&includeHistoricalDetails=N&authenticationGuid=${process.env.ABRXML_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch organisation details');
    }

    const xml = await response.text();

    // Parse the XML reponse into a DOM
    const parser = new XMLParser();
    const doc = parser.parse(xml);

    // Check for error
    const error =
      doc.ABRPayloadSearchResults.response.exception?.exceptionDescription;
    if (error) {
      throw new Error('ABN or ACN not found');
    }

    const businessEntity = doc.ABRPayloadSearchResults.response.businessEntity;

    // Get the entity name
    let entityName = '';

    if (businessEntity.mainName) {
      entityName = businessEntity.mainName.organisationName;
    } else if (businessEntity.legalName) {
      const givenName = businessEntity.legalName.givenName;
      const otherGivenName = businessEntity.legalName.otherGivenName;
      const familyName = businessEntity.legalName.familyName;
      entityName = `${familyName}, ${givenName}${otherGivenName ? ` ${otherGivenName}` : ''}`;
    }

    // Get the entity type
    const type = businessEntity.entityType.entityDescription;

    return { name: entityName, type: types.find((t) => t === type) || 'Other' };
  },
});
