import { v } from 'convex/values';
import type { Id } from '../_generated/dataModel';
import { type MutationCtx, type QueryCtx, query } from '../_generated/server';
import { listDomainsByFrameworkId } from '../data/domains';
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

// Query

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
