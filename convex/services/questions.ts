import type { DataModel } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { listResponseOptionsByQuestionId } from '../data/responseOptions';

// Helpers

export async function mapQuestionsWithResponseOptions(
  ctx: QueryCtx | MutationCtx,
  questions: DataModel['questions']['document'][]
) {
  return await Promise.all(
    questions.map(async (question) => {
      const responseOptions = await listResponseOptionsByQuestionId(
        ctx,
        question._id
      );

      return {
        ...question,
        responseOptions,
      };
    })
  );
}
