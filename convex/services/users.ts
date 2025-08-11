import { ConvexError, v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import { getMembershipsInActiveOrganisation } from '../utils/memberships';
import {
  getCurrentUser,
  getCurrentUserId,
  getUserByEmail,
  updateCurrentUser,
} from '../utils/users';

// Query

export const getCurrentId = query({
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx);
    return userId;
  },
});

export const getCurrent = query({
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await getUserByEmail(ctx, args.email);
    return user;
  },
});

export const getImageForCurrent = query({
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new ConvexError('not_authenticated');
    }
    const imageUrl = user.imageUrl || null;
    return imageUrl;
  },
});

export const listInActiveOrganisation = query({
  handler: async (ctx) => {
    const activeOrganisationMemberships =
      await getMembershipsInActiveOrganisation(ctx);
    if (!activeOrganisationMemberships) {
      throw new ConvexError('no_active_organisation');
    }
    const users = await Promise.all(
      activeOrganisationMemberships.map(
        async (membership) => await ctx.db.get(membership.userId)
      )
    );
    return users;
  },
});

// Mutate

export const updateCurrent = mutation({
  args: {
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.union(v.string(), v.null())),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    activeOrganisationId: v.optional(v.id('organisations')),
  },
  handler: async (ctx, args) => {
    await updateCurrentUser(ctx, {
      ...(args.firstName ? { firstName: args.firstName } : {}),
      ...(args.lastName ? { lastName: args.lastName } : {}),
      ...(args.imageUrl ? { imageUrl: args.imageUrl } : {}),
      ...(args.email ? { email: args.email } : {}),
      ...(args.phone ? { phone: args.phone } : {}),
      ...(args.activeOrganisationId
        ? { activeOrganisationId: args.activeOrganisationId }
        : {}),
      // Remove imageUrl if it's null
      ...(args.imageUrl === null ? { imageUrl: undefined } : {}),
    });
  },
});

export const updateImageForCurrent = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (!imageUrl) {
      throw new ConvexError('image_not_found');
    }
    await updateCurrentUser(ctx, {
      imageUrl,
    });
  },
});

// Action
