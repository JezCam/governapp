import { query } from '../_generated/server';
import {
  getMembershipsByUserId,
  getMembershipsInActiveOrganisation,
  getMembershipsInActiveOrganisationWithUsers,
} from '../utils/memberships';
import { getCurrentUserId } from '../utils/users';

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
    const userId = await getCurrentUserId(ctx);
    const memberships = getMembershipsByUserId(ctx, userId);
    return memberships;
  },
});

// Mutate
