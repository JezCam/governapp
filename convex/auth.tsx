import Google from '@auth/core/providers/google';
import Resend from '@auth/core/providers/resend';
import { convexAuth } from '@convex-dev/auth/server';
import { render } from '@react-email/components';
import MagicLinkEmail from '@/emails/magic-link';
import type { MutationCtx } from './_generated/server';
import './polyfills';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google,
    Resend({
      id: 'magic-link',
      maxAge: 60 * 15, // 15 minutes
      async sendVerificationRequest(params) {
        const { identifier: to, url } = params;
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'GovernApp <onboarding@jeremycameron.com>',
            to,
            subject: 'Sign in to GovernApp',
            html: await render(<MagicLinkEmail magicLink={url} />),
          }),
        });
        if (!res.ok) {
          throw new Error(`Resend error: ${JSON.stringify(await res.json())}`);
        }
      },
    }),
  ],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx: MutationCtx, args) {
      const user = await ctx.db.get(args.userId);

      if (!user) {
        throw new Error(`User with ID ${args.userId} not found.`);
      }

      // If no imageUrl, but now we have one from oAuth, update it
      if (!user.imageUrl && user.imageUrl) {
        await ctx.db.patch(args.userId, { imageUrl: user.imageUrl });
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

      await ctx.db.patch(args.userId, {
        onboardingStep: 0, // Initialise onboarding step to 0
      });
    },
  },
});
