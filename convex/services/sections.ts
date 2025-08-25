import type { DataModel, Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { listQuestionsBySectionId } from '../data/questions';
import { mapQuestionsWithResponseOptionsAndExistingReponse } from './questions';

// Helpers

export async function mapSectionsWithQuestions(
  ctx: QueryCtx | MutationCtx,
  sections: DataModel['sections']['document'][],
  userAssessmentId?: Id<'userAssessments'>
) {
  return await Promise.all(
    sections.map(async (section) => {
      const questions = await listQuestionsBySectionId(ctx, section._id);

      const questionsWithResponseOptions =
        await mapQuestionsWithResponseOptionsAndExistingReponse(
          ctx,
          questions,
          userAssessmentId
        );

      return {
        ...section,
        questions: questionsWithResponseOptions,
      };
    })
  );
}
