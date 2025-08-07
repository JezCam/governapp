import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import { getActiveOrganisation } from '../utils/organisation';
import { getCurrentUserId } from '../utils/users';

// Query

export const getActive = query({
  handler: async (ctx) => {
    return await getActiveOrganisation(ctx);
  },
});

// Mutate

export const setActive = mutation({
  args: { organisationId: v.id('organisations') },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    await ctx.db.patch(userId, { activeOrganisationId: args.organisationId });
  },
});
