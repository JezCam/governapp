import { v } from 'convex/values';
import type { Id } from '../_generated/dataModel';
import {
  internalMutation,
  type MutationCtx,
  mutation,
  type QueryCtx,
  query,
} from '../_generated/server';
import { listSubscriptionsByOrganisationId } from '../data/subscriptions';
import { getActiveOrganisationId } from './organisations';

// Helpers

export async function listSubscriptionsWithFrameworkByOrganisationId(
  ctx: QueryCtx | MutationCtx,
  organisationId: Id<'organisations'>
) {
  const subscriptions = await listSubscriptionsByOrganisationId(
    ctx,
    organisationId
  );

  const subscriptionsWithFrameworks = await Promise.all(
    subscriptions.map(async (subscription) => {
      const framework = await ctx.db.get(subscription.frameworkId);
      if (framework === null) {
        return null;
      }
      return {
        ...subscription,
        framework,
      };
    })
  );

  return subscriptionsWithFrameworks.filter((s) => s !== null);
}

// Queries

export const listForActiveOrganisationWithFrameworks = query({
  handler: async (ctx) => {
    const activeOrganisationId = await getActiveOrganisationId(ctx);
    const frameworks = await listSubscriptionsWithFrameworkByOrganisationId(
      ctx,
      activeOrganisationId
    );

    return frameworks;
  },
});

// Mutations

export const create = internalMutation({
  args: {
    organisationId: v.id('organisations'),
    frameworkId: v.id('frameworks'),
    subscriptionId: v.string(),
    currentPeriodEnd: v.number(),
    lastRenewalDate: v.number(),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db.insert('subscriptions', {
      ...args,
      active: true,
    });

    return subscription;
  },
});

export const createFreeForActiveOrganisation = mutation({
  args: {
    frameworkId: v.id('frameworks'),
  },
  handler: async (ctx, { frameworkId }) => {
    const organisationId = await getActiveOrganisationId(ctx);

    await ctx.db.insert('subscriptions', {
      organisationId,
      frameworkId,
      active: true,
      lastRenewalDate: Date.now(),
    });
  },
});
