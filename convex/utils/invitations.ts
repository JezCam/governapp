import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function getInvitationById(
  ctx: QueryCtx | MutationCtx,
  invitationId: Id<'invitations'>
) {
  const invitation = await ctx.db.get(invitationId);
  if (!invitation) {
    throw new Error(`Invitation with ID ${invitationId} not found.`);
  }

  return invitation;
}
