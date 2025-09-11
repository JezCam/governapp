import { v } from 'convex/values';
import Stripe from 'stripe';
import { api, internal } from './_generated/api';
import type { Id } from './_generated/dataModel';
import { action, internalAction } from './_generated/server';
import { createConvexError } from './errors';
import { turnoverRanges } from './schemas/organisations';

const turnoverRangeToPriceLookupKey = {
  [turnoverRanges[0]]: 'active_extra_small', // $0 - $50,000 = $600 p/yr
  [turnoverRanges[1]]: 'active_small', // $50,001 - $250,000 = $840 p/yr
  [turnoverRanges[2]]: 'active_medium', // $250,001 - $1m = $1,200 p/yr
  [turnoverRanges[3]]: 'active_large', // $1m - $10m = $1,800 p/yr
  [turnoverRanges[4]]: 'active_very_large', // $10m - $100m = $4,200 p/yr
  [turnoverRanges[5]]: 'active_extra_large', // $100m+ = $12,000 p/yr
} as const;

export const checkout = action({
  args: { priceLookupKey: v.optional(v.string()) },
  handler: async (ctx, { priceLookupKey }) => {
    const currentUser = await ctx.runQuery(api.services.users.getCurrent);

    if (!currentUser) {
      throw createConvexError('USER_NOT_FOUND');
    }

    const activeOrganisationId = currentUser.activeOrganisationId;

    if (!activeOrganisationId) {
      throw createConvexError('NO_ACTIVE_ORGANISATION');
    }

    const activeOrganisation = await ctx.runQuery(
      api.services.organisations.getById,
      { organisationId: activeOrganisationId }
    );

    if (!activeOrganisation) {
      throw createConvexError('ORGANISATION_NOT_FOUND');
    }

    const domain = process.env.SITE_URL ?? 'http://localhost:5173';

    if (!process.env.STRIPE_KEY) {
      throw createConvexError('STRIPE_KEY_NOT_CONFIGURED');
    }

    const stripe = new Stripe(process.env.STRIPE_KEY);

    const priceId = (
      await stripe.prices.list({
        lookup_keys: [
          priceLookupKey ??
            turnoverRangeToPriceLookupKey[activeOrganisation.turnoverRange],
        ],
      })
    ).data[0].id;

    const activation = !priceLookupKey;

    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        customer_email: currentUser.email,
        metadata: {
          organisationId: activeOrganisationId as string,
          activation: activation ? 'true' : null,
        },
        mode: 'subscription',
        success_url: activation
          ? `${domain}/dashboard/organisation`
          : `${domain}/dashboard/frameworks`,
        cancel_url: activation
          ? `${domain}/dashboard/organisation`
          : `${domain}/dashboard/frameworks`,
      });

    return session;
  },
});

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async (ctx, { signature, payload }) => {
    if (!process.env.STRIPE_KEY) {
      throw createConvexError('STRIPE_KEY_NOT_CONFIGURED');
    }

    const stripe = new Stripe(process.env.STRIPE_KEY);

    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET as string;

    try {
      const event = await stripe.webhooks.constructEventAsync(
        payload,
        signature,
        webhookSecret
      );

      switch (event.type) {
        case 'checkout.session.completed': {
          const checkoutEvent = event.data.object as Stripe.Checkout.Session & {
            metadata: { organisationId: string };
          };

          const subscription = (await stripe.subscriptions.retrieve(
            checkoutEvent.subscription as string
          )) as Stripe.Subscription;

          const organisationId = checkoutEvent.metadata
            .organisationId as Id<'organisations'>;

          const activation = !!checkoutEvent.metadata.activation;

          if (activation) {
            await ctx.runMutation(api.services.organisations.updateById, {
              organisationId,
              data: {
                active: true,
                subscriptionId: subscription.id,
                currentPeriodEnd:
                  subscription.items.data[0].current_period_end * 1000, // Convert to ms
                lastRenewalDate:
                  subscription.items.data[0].current_period_start * 1000, // Convert to ms
              },
            });
          } else {
            // Framework subscription
            const frameworkId = await ctx.runQuery(
              internal.services.frameworks.getIdByPriceLookupKey,
              {
                priceLookupKey: subscription.items.data[0].price
                  .lookup_key as string,
              }
            );

            await ctx.runMutation(internal.services.subscriptions.create, {
              organisationId,
              frameworkId,
              subscriptionId: subscription.id,
              currentPeriodEnd:
                subscription.items.data[0].current_period_end * 1000, // Convert to ms
              lastRenewalDate:
                subscription.items.data[0].current_period_start * 1000, // Convert to ms
            });
          }

          break;
        }

        case 'customer.subscription.updated': {
          break;
        }
        case 'customer.subscription.deleted':
          break;
        default:
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: (err as { message: string }).message };
    }
  },
});
