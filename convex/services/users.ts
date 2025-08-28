import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import {
  type MutationCtx,
  mutation,
  type QueryCtx,
  query,
} from '../_generated/server';
import { getStorageUrl } from '../data/storage';
import { getUserByEmail } from '../data/users';
import { createConvexError } from '../errors';
import { isAdminByCurrentUserAndActiveOrganisation } from './memberships';

// Helpers

export async function getCurrentUserId(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw createConvexError('UNAUTHENTICATED');
  }

  return userId;
}

export async function getCurrentUser(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw createConvexError('UNAUTHENTICATED');
  }

  const user = await ctx.db.get(userId);
  if (!user) {
    throw createConvexError('USER_NOT_FOUND');
  }

  return user;
}

// Query

export const getCurrentId = query({
  handler: async (ctx) => {
    return await getCurrentUserId(ctx);
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
    if (!user) {
      throw createConvexError('USER_NOT_FOUND');
    }

    return user;
  },
});

export const getImageForCurrent = query({
  handler: async (ctx) => {
    const currentUser = await getCurrentUser(ctx);
    const imageUrl = currentUser.imageUrl || null;

    return imageUrl;
  },
});

export const isAdminOfActiveOrganisation = query({
  handler: async (ctx) => {
    return await isAdminByCurrentUserAndActiveOrganisation(ctx);
  },
});

// Mutate

export const updateCurrent = mutation({
  args: {
    data: v.object({
      firstName: v.optional(v.string()),
      lastName: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      activeOrganisationId: v.optional(v.id('organisations')),
      onboardingStep: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw createConvexError('UNAUTHENTICATED');
    }

    await ctx.db.patch(userId, args.data);
  },
});

export const updateImageForCurrent = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw createConvexError('UNAUTHENTICATED');
    }

    const imageUrl = await getStorageUrl(ctx, args.storageId);

    if (!imageUrl) {
      throw createConvexError('STORAGE_NOT_FOUND');
    }

    await ctx.db.patch(userId, {
      imageUrl,
    });
  },
});
