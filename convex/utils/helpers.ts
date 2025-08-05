import { getAuthUserId } from '@convex-dev/auth/server';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function getUser(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error('User not authenticated');
  }
  const user = await ctx.db.get(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }
  return user;
}
