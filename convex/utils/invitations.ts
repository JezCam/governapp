import { ConvexError } from 'convex/values';
import type { DataModel, Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function getInvitationById(
  ctx: QueryCtx | MutationCtx,
  invitationId: Id<'invitations'>
) {
  const invitation = await ctx.db.get(invitationId);
  if (!invitation) {
    throw new ConvexError('invitation_not_found');
  }

  return invitation;
}

export async function listInvitationsByEmailAndStatus(
  ctx: QueryCtx | MutationCtx,
  email: string,
  status: DataModel['invitations']['document']['status']
) {
  const invitations = await ctx.db
    .query('invitations')
    .withIndex('by_inviteeEmail_status', (q) =>
      q.eq('inviteeEmail', email).eq('status', status)
    )
    .collect();

  return invitations;
}

export async function listInvitationsByOrganisationAndStatus(
  ctx: QueryCtx | MutationCtx,
  organisationId: Id<'organisations'>,
  status: DataModel['invitations']['document']['status']
) {
  const invitations = await ctx.db
    .query('invitations')
    .withIndex('by_organisation_status', (q) =>
      q.eq('organisationId', organisationId).eq('status', status)
    )
    .collect();

  return invitations;
}
