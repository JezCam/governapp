import { ConvexError } from 'convex/values';
import { query } from '../_generated/server';
import {
  getMembershipsForCurrentUser,
  getMembershipsInActiveOrganisation,
  getMembershipsInActiveOrganisationWithUsers,
} from '../utils/memberships';

// Query

export const listInActiveOrganisation = query({
  handler: async (ctx) => {
    const memberships = await getMembershipsInActiveOrganisation(ctx);
    return memberships;
  },
});

export const listInActiveOrganisationWithUsers = query({
  handler: async (ctx) => {
    const membershipsWithUsers =
      await getMembershipsInActiveOrganisationWithUsers(ctx);
    return membershipsWithUsers;
  },
});

export const listForCurrentUser = query({
  handler: async (ctx) => {
    return await getMembershipsForCurrentUser(ctx);
  },
});

export const listForCurrentUserWithOrganisation = query({
  handler: async (ctx) => {
    const memberships = await getMembershipsForCurrentUser(ctx);
    const membershipsWithOrganisation = await Promise.all(
      memberships.map(async (membership) => {
        const organisation = await ctx.db.get(membership.organisationId);
        if (organisation === null) {
          return null;
        }
        return {
          ...membership,
          organisation,
        };
      })
    ).then((results) => results.filter((m) => m !== null));

    if (membershipsWithOrganisation.length === 0) {
      throw new ConvexError('no_memberships_with_organisations_for_user');
    }

    return membershipsWithOrganisation;
  },
});

// Mutate
