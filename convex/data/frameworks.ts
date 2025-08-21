import type { DataModel } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';

export async function mapFrameworksWithDomains(
  ctx: QueryCtx | MutationCtx,
  frameworks: DataModel['frameworks']['document'][]
) {
  return await Promise.all(
    frameworks.map(async (framework) => {
      const domains = await ctx.db
        .query('domains')
        .withIndex('by_framework', (q) => q.eq('frameworkId', framework._id))
        .collect();

      return {
        ...framework,
        domains,
      };
    })
  );
}

export async function listFrameworksByTypeWithDomains(
  ctx: QueryCtx | MutationCtx,
  type: 'self' | 'board'
) {
  const frameworks = await ctx.db
    .query('frameworks')
    .withIndex('by_type', (q) => q.eq('type', type))
    .collect();

  const frameworksWithDomains = await mapFrameworksWithDomains(ctx, frameworks);

  return frameworksWithDomains;
}
