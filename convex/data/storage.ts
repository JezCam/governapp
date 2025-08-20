import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function getStorageUrl(
  ctx: QueryCtx | MutationCtx,
  storageId: Id<'_storage'>
) {
  const url = await ctx.storage.getUrl(storageId);
  return url;
}
