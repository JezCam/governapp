import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import { listActionCommentsByActionId } from '../data/actionComments';
import { createConvexError } from '../errors';
import { getCurrentUserId } from './users';

// Queries

export const listByActionIdWithUser = query({
  args: {
    actionId: v.id('actions'),
  },
  handler: async (ctx, { actionId }) => {
    const actionComments = await listActionCommentsByActionId(ctx, actionId);

    const actionCommentsWithUser = await Promise.all(
      actionComments.map(async (comment) => {
        const user = await ctx.db.get(comment.userId);
        if (user === null) {
          throw new Error('User not found');
        }
        return { ...comment, user };
      })
    );

    return actionCommentsWithUser;
  },
});

// Mutations

export const create = mutation({
  args: {
    actionId: v.id('actions'),
    content: v.string(),
  },
  handler: async (ctx, { actionId, content }) => {
    const currentUserId = await getCurrentUserId(ctx);

    const action = await ctx.db.get(actionId);
    if (action === null) {
      throw createConvexError('ACTION_NOT_FOUND');
    }

    const newComment = {
      actionId,
      content,
      userId: currentUserId,
    };

    await ctx.db.insert('actionComments', newComment);

    // Update numComments in the action
    await ctx.db.patch(actionId, { numComments: action.numComments + 1 });
  },
});
