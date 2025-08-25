import type { DataModel, Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { getQuestionResponseByUserAssessmentIdAndQuestionId } from '../data/questionResponses';
import { listResponseOptionsByQuestionId } from '../data/responseOptions';

// Helpers

export async function mapQuestionsWithResponseOptionsAndExistingReponse(
  ctx: QueryCtx | MutationCtx,
  questions: DataModel['questions']['document'][],
  userAssessmentId?: Id<'userAssessments'>
) {
  return await Promise.all(
    questions.map(async (question) => {
      const responseOptions = await listResponseOptionsByQuestionId(
        ctx,
        question._id
      );

      const existingResponse = userAssessmentId
        ? await getQuestionResponseByUserAssessmentIdAndQuestionId(
            ctx,
            userAssessmentId,
            question._id
          )
        : null;

      return {
        ...question,
        responseOptions,
        ...(existingResponse && {
          existingResponseOptionId: existingResponse.responseOptionId,
        }),
      };
    })
  );
}
