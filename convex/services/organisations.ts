import { ConvexError, v } from 'convex/values';
import { internal } from '../_generated/api';
import { action, internalQuery, mutation, query } from '../_generated/server';
import { turnoverRanges, types } from '../schemas/organisationSchemas';
import {
  AbrSeachByAbnOrAcn,
  createOrganisationAndMembership,
  getActiveOrganisation,
  getActiveOrganisationId,
  getOrganisationById,
  updateOrganisationById,
} from '../utils/organisations';
import { getStorageUrl } from '../utils/storage';
import { getCurrentUserId } from '../utils/users';

// Query

export const getById = query({
  args: { organisationId: v.id('organisations') },
  handler: async (ctx, args) => {
    return await getOrganisationById(ctx, args.organisationId);
  },
});

export const getActive = query({
  handler: async (ctx) => {
    return await getActiveOrganisation(ctx);
  },
});

export const getByAbnOrAcn = internalQuery({
  args: { abnOrAcn: v.string() },
  handler: async (ctx, args) => {
    const existingOrg = await ctx.db
      .query('organisations')
      .withIndex('by_abnOrAcn', (q) => q.eq('abnOrAcn', args.abnOrAcn))
      .first();
    return existingOrg;
  },
});

// Mutate

export const updateActive = mutation({
  args: {
    imageUrl: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    const activeOrganisationId = await getActiveOrganisationId(ctx);

    await updateOrganisationById(ctx, activeOrganisationId, {
      imageUrl: args.imageUrl || undefined,
    });
  },
});

export const updateImageForActive = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const activeOrganisationId = await getActiveOrganisationId(ctx);
    const imageUrl = await getStorageUrl(ctx, args.storageId);

    await updateOrganisationById(ctx, activeOrganisationId, {
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
      createdByUserId: currentUserId,
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
    const organisation = await getOrganisationById(ctx, organisationId);
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
      throw new ConvexError('abn_or_acn_already_exists');
    }

    // Get Organisation Name and Type from ABRXML API
    const { name, type } = await AbrSeachByAbnOrAcn(args.abnOrAcn, args.isAbn);

    return { name, type };
  },
});
