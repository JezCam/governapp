import type { DataModel } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { listSectionsByDomainId } from '../data/sections';

// Helpers

export async function mapDomainsWithSections(
  ctx: QueryCtx | MutationCtx,
  domains: DataModel['domains']['document'][]
) {
  return await Promise.all(
    domains.map(async (domain) => {
      const sections = (await listSectionsByDomainId(ctx, domain._id)).sort(
        (a, b) => a.order - b.order
      );

      return {
        ...domain,
        sections,
      };
    })
  );
}
