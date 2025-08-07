import { v } from 'convex/values';
import { api, internal } from '../_generated/api';
import { action, mutation, query } from '../_generated/server';
import { getMembershipsInActiveOrganisation } from '../utils/memberships';
import {
  getCurrentUser,
  getCurrentUserId,
  getUserByEmail,
  getUserById,
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

export const getImage = query({
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    const imageUrl = user.imageUrl || null;
    return imageUrl;
  },
});

export const listInActiveOrganisation = query({
  handler: async (ctx) => {
    const activeOrganisationMemberships =
      await getMembershipsInActiveOrganisation(ctx);
    const users = await Promise.all(
      activeOrganisationMemberships.map(
        async (membership) => await getUserById(ctx, membership.userId)
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

// mutation function to update user image
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

// mutation function to remove user image
export const removeImage = mutation({
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    await ctx.db.patch(user._id, { image: undefined });
  },
});
