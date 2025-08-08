import { ConvexError } from 'convex/values';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { getCurrentUser } from './users';

export async function getActiveOrganisationId(ctx: QueryCtx | MutationCtx) {
  const user = await getCurrentUser(ctx);
  if (!user) {
    throw new ConvexError('not_authenticated');
  }
  const activeOrganisationId = user.activeOrganisationId;
  if (!activeOrganisationId) {
    throw new ConvexError('no_active_organisation');
  }
  return activeOrganisationId;
}

export async function getActiveOrganisation(ctx: QueryCtx | MutationCtx) {
  const activeOrganisationId = await getActiveOrganisationId(ctx);
  const organisation = await ctx.db.get(activeOrganisationId);
  if (!organisation) {
    throw new ConvexError('active_organisation_not_found');
  }
  return organisation;
}
