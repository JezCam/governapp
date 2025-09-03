import { v } from 'convex/values';
import { mutation } from '../_generated/server';
import { createConvexError } from '../errors';
import { actionStatuses } from '../schemas/actions';

// Mutations

export const update = mutation({
  args: {
    id: v.id('actions'),
    status: v.union(...actionStatuses.map(v.literal)),
    dueDate: v.number(),
    assigneeUserId: v.optional(v.id('users')),
  },
  handler: async (ctx, { id, status, dueDate, assigneeUserId }) => {
    const action = await ctx.db.get(id);
    if (action === null) {
      throw createConvexError('ACTION_NOT_FOUND');
    }

    await ctx.db.patch(id, { ...action, status, dueDate, assigneeUserId });
  },
});
