import { ConvexError, v } from 'convex/values';
import { api, internal } from '../_generated/api';
import { action, mutation, query } from '../_generated/server';
import { getMembershipsInActiveOrganisation } from '../utils/memberships';
import {
  getCurrentUser,
  getCurrentUserId,
  getUserByEmail,
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

export const update = mutation({
  args: {
    name: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    const updates = {
      ...(args.name ? { name: args.name } : {}),
      ...(args.firstName ? { firstName: args.firstName } : {}),
      ...(args.lastName ? { lastName: args.lastName } : {}),
      ...(args.imageUrl ? { imageUrl: args.imageUrl } : {}),
      ...(args.email ? { email: args.email } : {}),
      ...(args.phone ? { phone: args.phone } : {}),
    };
    await ctx.db.patch(user._id, updates);
  },
});

export const removeImage = mutation({
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    await ctx.db.patch(user._id, { image: undefined });
  },
});

// Action

export const updateImage = action({
  args: { bytes: v.bytes(), type: v.string() },
  handler: async (ctx, args) => {
    const imageUrl = await ctx.runAction(
      internal.utils.files.uploadImage,
      args
    );
    await ctx.runMutation(api.services.users.update, {
      imageUrl,
    });
  },
});
