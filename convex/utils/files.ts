import { v } from 'convex/values';
import { internalAction } from '../_generated/server';

export const uploadImage = internalAction({
  args: { bytes: v.bytes(), type: v.string() },
  handler: async (ctx, args) => {
    const blob = new Blob([args.bytes], { type: args.type });

    const result = await ctx.storage.store(blob);
    if (!result) {
      throw new Error('Failed to store profile image');
    }
    const imageUrl = await ctx.storage.getUrl(result);
    if (!imageUrl) {
      throw new Error('Failed to get URL for profile image');
    }
    return imageUrl;
  },
});
