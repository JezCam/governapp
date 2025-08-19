import { ConvexError, v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import {
  getMembershipById,
  getMembershipsByUserId,
  getMembershipsForCurrentUser,
  getMembershipsInActiveOrganisation,
  getMembershipsInActiveOrganisationWithUsers,
} from '../utils/memberships';
import { getUserById } from '../utils/users';

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

export const update = mutation({
  args: {
    id: v.id('memberships'),
    data: v.object({
      role: v.string(),
      isAdmin: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    const membership = await getMembershipById(ctx, args.id);

    // If removing admin status, ensure the user is not the organisation creator
    if (args.data.isAdmin === false && membership.isOwner) {
      throw new ConvexError('cannot_remove_admin_status_of_creator');
    }

    await ctx.db.patch(args.id, args.data);
  },
});

export const remove = mutation({
  args: { id: v.id('memberships') },
  handler: async (ctx, args) => {
    const membership = await getMembershipById(ctx, args.id);

    // If removing the organisation creator, throw an error
    if (membership.isOwner) {
      throw new ConvexError('cannot_remove_organisation_creator');
    }

    // If user has no other organisations, update their onboarding step
    // Otherwise, update their active organisation
    const user = await getUserById(ctx, membership.userId);
    const memberships = await getMembershipsByUserId(ctx, membership.userId);

    const otherMembership = memberships.find(
      (m) => m.organisationId !== membership.organisationId
    );

    // If the user has another membership, set it as active
    if (otherMembership) {
      await ctx.db.patch(user._id, {
        activeOrganisationId: otherMembership.organisationId,
      });
    } else {
      await ctx.db.patch(user._id, { onboardingStep: 1 });
    }

    // TODO: Email and notify the user about the removal

    await ctx.db.delete(args.id);
  },
});
