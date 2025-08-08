import { v } from 'convex/values';
import { api, internal } from '../_generated/api';
import {
  action,
  internalMutation,
  mutation,
  query,
} from '../_generated/server';
import { getActiveOrganisation } from '../utils/organisation';
import { getCurrentUserId } from '../utils/users';

// Query

export const getActive = query({
  handler: async (ctx) => {
    return await getActiveOrganisation(ctx);
  },
});

// Mutate

export const updateById = internalMutation({
  args: {
    organisationId: v.id('organisations'),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates = {
      ...(args.imageUrl ? { imageUrl: args.imageUrl } : {}),
    };
    await ctx.db.patch(args.organisationId, updates);
  },
});

export const setActive = mutation({
  args: { organisationId: v.id('organisations') },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    await ctx.db.patch(userId, { activeOrganisationId: args.organisationId });
  },
});

// mutation function to update organisation image
export const updateImageForActive = action({
  args: {
    bytes: v.bytes(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const activeOrganisation = await ctx.runQuery(
      api.services.organisation.getActive
    );
    const imageUrl = await ctx.runAction(
      internal.utils.files.uploadImage,
      args
    );
    await ctx.runMutation(internal.services.organisation.updateById, {
      organisationId: activeOrganisation._id,
      imageUrl,
    });
  },
});

export const removeImageForActive = mutation({
  handler: async (ctx) => {
    const activeOrganisation = await getActiveOrganisation(ctx);
    await ctx.db.patch(activeOrganisation._id, { imageUrl: undefined });
  },
});
