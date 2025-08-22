import type { DataModel } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { listQuestionsBySectionId } from '../data/questions';
import { mapQuestionsWithResponseOptions } from './questions';

// Helpers

export async function mapSectionsWithQuestions(
  ctx: QueryCtx | MutationCtx,
  sections: DataModel['sections']['document'][]
) {
  return await Promise.all(
    sections.map(async (section) => {
      const questions = await listQuestionsBySectionId(ctx, section._id);

      const questionsWithResponseOptions =
        await mapQuestionsWithResponseOptions(ctx, questions);

      return {
        ...section,
        questions: questionsWithResponseOptions,
      };
    })
  );
}
