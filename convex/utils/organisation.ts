import type { MutationCtx, QueryCtx } from '../_generated/server';
import { getCurrentUser } from './users';

export async function getActiveOrganisationId(ctx: QueryCtx | MutationCtx) {
  const user = await getCurrentUser(ctx);
  if (!user.activeOrganisationId) {
    throw new Error('User does not have an active organisation');
  }
  return user.activeOrganisationId;
}

export async function getActiveOrganisation(ctx: QueryCtx | MutationCtx) {
  const activeOrganisationId = await getActiveOrganisationId(ctx);
  const organisation = await ctx.db.get(activeOrganisationId);
  if (!organisation) {
    throw new Error(`Organisation with ID ${activeOrganisationId} not found.`);
  }
  return organisation;
}
