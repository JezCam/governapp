import type { DataModel, Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { listSectionsByDomainId } from '../data/sections';
import { mapSectionsWithQuestions } from './sections';

// Helpers

export async function mapDomainsWithSections(
  ctx: QueryCtx | MutationCtx,
  domains: DataModel['domains']['document'][],
  userAssessmentId?: Id<'userAssessments'>
) {
  return await Promise.all(
    domains.map(async (domain) => {
      const sections = await listSectionsByDomainId(ctx, domain._id);

      const sectionsWithQuestions = await mapSectionsWithQuestions(
        ctx,
        sections,
        userAssessmentId
      );

      return {
        ...domain,
        sections: sectionsWithQuestions,
      };
    })
  );
}
