// Query

import { v } from 'convex/values';
import { query } from '../_generated/server';
import { listDomainsByFrameworkId } from '../data/domains';
import { mapFrameworksWithDomains } from '../data/frameworks';
import { listSubscriptionsByOrganisationId } from '../data/subscriptions';
import { getActiveOrganisationId } from './organisations';
import { listSubscriptionsWithFrameworkByOrganisationId } from './subscriptions';

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('frameworks').collect();
  },
});

export const listWithDomains = query({
  handler: async (ctx) => {
    const frameworks = await ctx.db.query('frameworks').collect();

    const frameworksWithDomains = await mapFrameworksWithDomains(
      ctx,
      frameworks
    );

    return frameworksWithDomains;
  },
});

export const listUnsubscribedForActiveOrganisation = query({
  handler: async (ctx) => {
    const activeOrganisationId = await getActiveOrganisationId(ctx);
    const subscribedFrameworks = await listSubscriptionsByOrganisationId(
      ctx,
      activeOrganisationId
    );

    const allFrameworks = await ctx.db.query('frameworks').collect();

    return allFrameworks.filter(
      (framework) =>
        !subscribedFrameworks.some(
          (subscription) => subscription.frameworkId === framework._id
        )
    );
  },
});

export const listSubscribedByTypeWithDomains = query({
  args: {
    type: v.union(v.literal('self'), v.literal('board')),
  },
  handler: async (ctx, { type }) => {
    const activeOrganisationId = await getActiveOrganisationId(ctx);
    const subscriptions = await listSubscriptionsWithFrameworkByOrganisationId(
      ctx,
      activeOrganisationId
    );

    const filteredSubscriptions = subscriptions.filter(
      (subscription) => subscription.framework.type === type
    );

    const frameworksWithDomains = await Promise.all(
      filteredSubscriptions.map(async (subscription) => {
        const domains = await listDomainsByFrameworkId(
          ctx,
          subscription.frameworkId
        );
        return {
          ...subscription.framework,
          domains,
        };
      })
    );

    return frameworksWithDomains;
  },
});
