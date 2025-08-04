import { getAuthUserId } from '@convex-dev/auth/server';
// If using Convex, generate the server types first by running `npx convex dev` or `npx convex codegen`
// Then, ensure the import path is correct. For example:
import { query } from '../_generated/server';

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});
