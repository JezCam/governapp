import type { MutationCtx, QueryCtx } from '../_generated/server';

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
