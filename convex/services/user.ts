import { v } from 'convex/values';
import { api, internal } from '../_generated/api';
import { action, mutation, query } from '../_generated/server';
import { getUser } from '../utils/helpers';

export const getCurrent = query({
  handler: async (ctx) => {
    return await getUser(ctx);
  },
});

export const getImage = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);
    const imageUrl = user.image || null;
    return imageUrl;
  },
});

export const update = mutation({
  args: {
    name: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    const updates = {
      ...(args.name ? { name: args.name } : {}),
      ...(args.firstName ? { firstName: args.firstName } : {}),
      ...(args.lastName ? { lastName: args.lastName } : {}),
      ...(args.image ? { image: args.image } : {}),
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
    await ctx.runMutation(api.services.user.update, {
      image: imageUrl,
    });
  },
});

// mutation function to remove user image
export const removeImage = mutation({
  handler: async (ctx) => {
    const user = await getUser(ctx);
    await ctx.db.patch(user._id, { image: undefined });
  },
});
