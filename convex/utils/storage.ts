import { ConvexError } from 'convex/values';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function getStorageUrl(
  ctx: QueryCtx | MutationCtx,
  storageId: string
) {
  const url = await ctx.storage.getUrl(storageId);
  if (!url) {
    throw new ConvexError('storage_not_found');
  }
  return url;
}
