import { getAuthUserId } from '@convex-dev/auth/server';
import { ConvexError } from 'convex/values';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function getCurrentUserId(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new ConvexError('not_authenticated');
  }
  return userId;
}

export async function getCurrentUser(ctx: QueryCtx | MutationCtx) {
  const userId = await getCurrentUserId(ctx);
  const user = await ctx.db.get(userId);
  if (!user) {
    throw new ConvexError('user_not_found');
  }
  return user;
}

export async function getUserByEmail(
  ctx: QueryCtx | MutationCtx,
  email: string
) {
  const user = await ctx.db
    .query('users')
    .withIndex('email', (q) => q.eq('email', email))
    .first();
  return user;
}
