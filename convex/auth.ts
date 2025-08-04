import Google from '@auth/core/providers/google';
import { convexAuth } from '@convex-dev/auth/server';
import type { MutationCtx } from './_generated/server';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Google],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx: MutationCtx, args) {
      const user = await ctx.db.get(args.userId);

      if (!user) {
        throw new Error(`User with ID ${args.userId} not found.`);
      }

      // If no name, but now we have one from oAuth, update it
      if (!(user.firstName || user.lastName) && user.name) {
        const names = user.name.split(' ');
        const firstName = names[0];
        const lastName = names[1];
        await ctx.db.patch(args.userId, { firstName, lastName });
      }

      // Skip if this is an existing user
      if (args.existingUserId) {
        return;
      }
    },
  },
});
