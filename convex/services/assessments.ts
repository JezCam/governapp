import { v } from 'convex/values';
import type { DataModel, Id } from '../_generated/dataModel';
import {
  type MutationCtx,
  mutation,
  type QueryCtx,
  query,
} from '../_generated/server';
import { listActionsByAssessmentId } from '../data/actions';
import { listDomainResultsByAssessmentId } from '../data/domainResults';
import {
  getQuestionResponseByUserAssessmentIdAndQuestionId,
  listQuestionResponsesByAssessmentIdAndQuestionId,
  listQuestionResponsesByUserAssessmentId,
} from '../data/questionResponses';
import {
  listQuestionResultsByAssessmentAndSectionId,
  listQuestionResultsByAssessmentId,
} from '../data/questionResults';
import {
  listQuestionsByDomainId,
  listQuestionsBySectionId,
} from '../data/questions';
import { listResponseOptionsByQuestionId } from '../data/responseOptions';
import {
  listSectionResultsByAssessmentAndDomainId,
  listSectionResultsByAssessmentId,
} from '../data/sectionResults';
import {
  listUserAssessmentsByAssessmentId,
  listUserAssessmentsByUserId,
  mapUserAssessmentsWithUser,
} from '../data/userAssessments';
import { createConvexError } from '../errors';
import { risks } from '../schemas/frameworks';
import { mapDomainsWithSections } from './domains';
import { isAdminByCurrentUserAndActiveOrganisation } from './memberships';
import { getActiveOrganisationId } from './organisations';
import { getCurrentUserId } from './users';

// Helpers

export async function listSelectedDomainsByAssessment(
  ctx: QueryCtx | MutationCtx,
  assessment: DataModel['assessments']['document']
) {
  const domains = (
    await Promise.all(
      assessment.selectedDomainIds.map((domainId) => ctx.db.get(domainId))
    )
  )
    .filter((d) => d !== null)
    .sort((a, b) => a.order - b.order);

  return domains;
}

const getDueDate = (risk: string) => {
  const month = 30 * 24 * 60 * 60 * 1000; // Approx month in ms
  switch (risk) {
    case 'black':
      return Date.now() + month;
    case 'red':
      return Date.now() + 3 * month;
    case 'amber':
      return Date.now() + 6 * month;
    case 'green':
      return Date.now() + 12 * month;
    default:
      return Date.now() + month;
  }
};

const getFeedbackForRisk = (
  risk: string,
  thresholds: { [key: string]: string }
) => {
  switch (risk) {
    case 'black':
      return thresholds.black;
    case 'red':
      return thresholds.red;
    case 'amber':
      return thresholds.amber;
    case 'green':
      return thresholds.green;
    default:
      return '';
  }
};

const getRisk = (score: number, thresholds: { [key: string]: number }) => {
  switch (true) {
    case score <= thresholds.black:
      return 'black';
    case score <= thresholds.red:
      return 'red';
    case score <= thresholds.amber:
      return 'amber';
    default:
      return 'green';
  }
};

export async function generateAssessmentReportAndActions(
  ctx: MutationCtx,
  assessmentId: Id<'assessments'>
) {
  // Get the assessment
  const assessment = await ctx.db.get(assessmentId);
  if (!assessment) {
    throw createConvexError('ASSESSMENT_NOT_FOUND');
  }

  const framework = await ctx.db.get(assessment.frameworkId);
  if (!framework) {
    throw createConvexError('FRAMEWORK_NOT_FOUND');
  }

  const domains = assessment.selectedDomainIds;

  // Get all the questions for the domains
  const questions = (
    await Promise.all(
      domains.map(
        async (domainId) => await listQuestionsByDomainId(ctx, domainId)
      )
    )
  ).flat();

  const allResponseOptions = await Promise.all(
    questions.map(async (question) =>
      listResponseOptionsByQuestionId(ctx, question._id)
    )
  );

  let assessmentMaxScore = 0;
  let assessmentActualScore = 0;

  const domainMaxScores = new Map<Id<'domains'>, number>();
  const domainActualScores = new Map<Id<'domains'>, number>();

  const sectionMaxScores = new Map<Id<'sections'>, number>();
  const sectionActualScores = new Map<Id<'sections'>, number>();

  const results = await Promise.all(
    questions.map(async (question, i) => {
      // For each question, get the response options
      const responseOptions = allResponseOptions[i];

      // Map responseOptionId to score for easy lookup
      const responseOptionsScores = new Map(
        responseOptions.map((ro) => [ro._id, ro.score])
      );

      // Get all the question responses for this question in this assessment
      const questionResponses =
        await listQuestionResponsesByAssessmentIdAndQuestionId(
          ctx,
          assessment._id,
          question._id
        );

      // Calculate score for this question
      const scoreSum = questionResponses.reduce((acc, qr) => {
        const responseOptionScore = responseOptionsScores.get(
          qr.responseOptionId
        );
        if (responseOptionScore !== undefined) {
          return acc + responseOptionScore;
        }
        return acc;
      }, 0);

      const scoreAvg = scoreSum / questionResponses.length || 0;

      // Get the nearest reponse option to the average score
      const nearestResponseOption = responseOptions.reduce((prev, curr) =>
        // If two options are equally near, prefer the lower score
        {
          const prevDistance = Math.abs(prev.score - scoreAvg);
          const currDistance = Math.abs(curr.score - scoreAvg);
          if (currDistance === prevDistance) {
            return curr.score < prev.score ? curr : prev;
          }
          return currDistance < prevDistance ? curr : prev;
        }
      );

      // Create the question result row
      await ctx.db.insert('questionResults', {
        assessmentId: assessment._id,
        sectionId: question.sectionId,
        questionId: question._id,
        averagedScore: scoreAvg,
        risk: nearestResponseOption.risk,
        feedback: nearestResponseOption.actionText || '',
        nearestResponseOptionId: nearestResponseOption._id,
      });

      if (nearestResponseOption.triggersAction) {
        // If the response option triggers an action, create the action
        await ctx.db.insert('actions', {
          text: nearestResponseOption.actionText ?? '',
          risk: nearestResponseOption.risk,
          status: 'not-started',
          dueDate: getDueDate(nearestResponseOption.risk),
          assessmentId: assessment._id,
          modelSolutionUrl: question.modelSolutionUrl,
          questionId: question._id,
          numComments: 0,
        });
      }

      if (nearestResponseOption.isValidNA) {
        // Don't account for valid NA responses in the score calculations
        return null;
      }

      // Get the maximum possible score for this question
      // (i.e. the highest score of all response options multiplied by the question weight)
      const maximumResponseScore = responseOptions.reduce(
        (max, ro) => Math.max(max, ro.score),
        0
      );
      const questionMaxScore = question.weight * maximumResponseScore;
      const questionScore = question.weight * scoreAvg;

      return {
        questionMaxScore,
        questionScore,
        domainId: question.domainId,
        sectionId: question.sectionId,
      };
    })
  );

  for (const result of results) {
    if (result === null) {
      continue;
    } // Skip valid NA responses

    const { questionMaxScore, questionScore, domainId, sectionId } = result;

    assessmentMaxScore += questionMaxScore;
    assessmentActualScore += questionScore;

    // Domain scores
    const currentDomainMaxScore = domainMaxScores.get(domainId) || 0;
    domainMaxScores.set(domainId, currentDomainMaxScore + questionMaxScore);

    const currentDomainActualScore = domainActualScores.get(domainId) || 0;
    domainActualScores.set(domainId, currentDomainActualScore + questionScore);

    // Section scores
    const currentSectionMaxScore = sectionMaxScores.get(sectionId) || 0;
    sectionMaxScores.set(sectionId, currentSectionMaxScore + questionMaxScore);

    const currentSectionActualScore = sectionActualScores.get(sectionId) || 0;
    sectionActualScores.set(
      sectionId,
      currentSectionActualScore + questionScore
    );
  }

  // Generate the section reports
  sectionActualScores.forEach(async (actualScore, sectionId) => {
    const section = await ctx.db.get(sectionId);
    if (section === null) {
      throw createConvexError('SECTION_NOT_FOUND');
    }

    const maxScore = sectionMaxScores.get(sectionId) ?? 0;
    const sectionCalculatedScore = (actualScore / maxScore) * 100;

    const risk = getRisk(sectionCalculatedScore, {
      black: section.blackMax,
      red: section.redMax,
      amber: section.amberMax,
    });

    const feedback = getFeedbackForRisk(risk, {
      black: section.reportBlack,
      red: section.reportRed,
      amber: section.reportAmber,
      green: section.reportGreen,
    });

    await ctx.db.insert('sectionResults', {
      maxScore,
      actualScore,
      calculatedScore: sectionCalculatedScore,
      risk,
      feedback,
      assessmentId: assessment._id,
      sectionId: section._id,
      domainId: section.domainId,
    });
  });

  // Generate the domain reports
  domainActualScores.forEach(async (actualScore, domainId) => {
    const domain = await ctx.db.get(domainId);
    if (domain === null) {
      throw createConvexError('DOMAIN_NOT_FOUND');
    }
    const maxScore = domainMaxScores.get(domainId) ?? 0;
    const domainCalculatedScore = (actualScore / maxScore) * 100;

    const risk = getRisk(domainCalculatedScore, {
      black: domain.blackMax,
      red: domain.redMax,
      amber: domain.amberMax,
    });

    const feedback = getFeedbackForRisk(risk, {
      black: domain.reportBlack,
      red: domain.reportRed,
      amber: domain.reportAmber,
      green: domain.reportGreen,
    });

    await ctx.db.insert('domainResults', {
      maxScore,
      actualScore,
      calculatedScore: domainCalculatedScore,
      risk,
      feedback,
      assessmentId: assessment._id,
      domainId: domain._id,
    });
  });

  const assessmentCalculatedScore =
    (assessmentActualScore / assessmentMaxScore) * 100;

  // Update the assessment with the final scores and risk level
  const assessmentRisk = getRisk(assessmentCalculatedScore, {
    black: framework.blackMax,
    red: framework.redMax,
    amber: framework.amberMax,
  });

  const assessmentFeedback = getFeedbackForRisk(assessmentRisk, {
    black: framework.reportBlack,
    red: framework.reportRed,
    amber: framework.reportAmber,
    green: framework.reportGreen,
  });

  await ctx.db.patch(assessment._id, {
    maxScore: assessmentMaxScore,
    actualScore: assessmentActualScore,
    calculatedScore: assessmentCalculatedScore,
    risk: assessmentRisk,
    feedback: assessmentFeedback,
    status: 'completed',
    finishDate: Date.now(),
  });
}

// Queries

export const listForActiveOrganisation = query({
  handler: async (ctx) => {
    const currentUserId = await getCurrentUserId(ctx);
    const activeOrganisationId = await getActiveOrganisationId(ctx);
    const userAsssessments = await listUserAssessmentsByUserId(
      ctx,
      currentUserId
    );
    const userAssessmentsFilteredByOrganisation = userAsssessments.filter(
      (ua) => !ua.organisationId || ua.organisationId === activeOrganisationId
    );

    return (
      await Promise.all(
        userAssessmentsFilteredByOrganisation.map(async (ua) => {
          const assessment = await ctx.db.get(ua.assessmentId);
          if (!assessment) {
            throw createConvexError('ASSESSMENT_NOT_FOUND');
          }

          const framework = await ctx.db.get(ua.frameworkId);
          if (!framework) {
            throw createConvexError('FRAMEWORK_NOT_FOUND');
          }

          const userAssessments = await listUserAssessmentsByAssessmentId(
            ctx,
            ua.assessmentId
          );

          const userAssessmentsWithUser = await mapUserAssessmentsWithUser(
            ctx,
            userAssessments
          );

          return {
            ...assessment,
            currentUserAssessment: ua,
            framework,
            userAssessments: userAssessmentsWithUser,
          };
        })
      )
    ).filter((a) => a !== null);
  },
});

export const getByUserAssessmentId = query({
  args: { userAssessmentId: v.id('userAssessments') },
  handler: async (ctx, args) => {
    const userAssessment = await ctx.db.get(args.userAssessmentId);
    if (!userAssessment) {
      throw createConvexError('USER_ASSESSMENT_NOT_FOUND');
    }

    const currentUserId = await getCurrentUserId(ctx);
    if (userAssessment.userId !== currentUserId) {
      throw createConvexError('NOT_USER_ASSESSMENT_USER');
    }

    const assessment = await ctx.db.get(userAssessment.assessmentId);
    if (!assessment) {
      throw createConvexError('ASSESSMENT_NOT_FOUND');
    }

    const framework = await ctx.db.get(userAssessment.frameworkId);
    if (!framework) {
      throw createConvexError('FRAMEWORK_NOT_FOUND');
    }

    // Get all domains for this assessment
    const domainsData = await listSelectedDomainsByAssessment(ctx, assessment);

    const domains = await mapDomainsWithSections(ctx, domainsData);

    // Get all questions with domain and section indexes
    const questionsData = (
      await Promise.all(
        domains.map(async (domain, d) =>
          (
            await Promise.all(
              domain.sections.map(async (section, s) =>
                (
                  await listQuestionsBySectionId(ctx, section._id)
                )
                  .sort((a, b) => a.order - b.order)
                  .map((question, q) => ({
                    ...question,
                    domainIndex: d,
                    sectionIndex: s,
                    questionIndex: q,
                  }))
              )
            )
          ).flat()
        )
      )
    ).flat();

    // Map questions with response options and existing responses
    const questions = await Promise.all(
      questionsData.map(async (question) => {
        const responseOptions = await listResponseOptionsByQuestionId(
          ctx,
          question._id
        );

        const existingResponse =
          await getQuestionResponseByUserAssessmentIdAndQuestionId(
            ctx,
            userAssessment._id,
            question._id
          );

        return {
          ...question,
          responseOptions,
          ...(existingResponse && {
            existingResponseOptionId: existingResponse.responseOptionId,
          }),
        };
      })
    );

    return {
      ...assessment,
      framework,
      domains,
      questions,
      userAssessment,
    };
  },
});

export const getNameByUserAssesmentId = query({
  args: { userAssessmentId: v.id('userAssessments') },
  handler: async (ctx, args) => {
    const userAssessment = await ctx.db.get(args.userAssessmentId);
    if (!userAssessment) {
      throw createConvexError('USER_ASSESSMENT_NOT_FOUND');
    }

    const currentUserId = await getCurrentUserId(ctx);
    if (userAssessment.userId !== currentUserId) {
      throw createConvexError('NOT_USER_ASSESSMENT_USER');
    }

    const assessment = await ctx.db.get(userAssessment.assessmentId);
    if (!assessment) {
      throw createConvexError('ASSESSMENT_NOT_FOUND');
    }

    return assessment.name;
  },
});

export type ReportRowQuestion = DataModel['questionResults']['document'] & {
  rowLevel: 'question';
  question: DataModel['questions']['document'];
  responseOptions: DataModel['responseOptions']['document'][];
  assessmentId: Id<'assessments'>;
  questionNumber: number;
};

export type ReportRowSection = DataModel['sectionResults']['document'] & {
  rowLevel: 'section';
  section: DataModel['sections']['document'];
  assessmentId: Id<'assessments'>;
  subRows: ReportRowQuestion[];
};

export type ReportRowDomain = DataModel['domainResults']['document'] & {
  rowLevel: 'domain';
  domain: DataModel['domains']['document'];
  assessmentId: Id<'assessments'>;
  subRows: ReportRowSection[];
};

export type ReportRowAssessment = DataModel['assessments']['document'] & {
  rowLevel: 'assessment';
  framework: DataModel['frameworks']['document'];
  subRows: ReportRowDomain[];
};

export type ReportRow =
  | ReportRowQuestion
  | ReportRowSection
  | ReportRowDomain
  | ReportRowAssessment;

export const listReportRows = query({
  handler: async (ctx) => {
    const currentUserId = await getCurrentUserId(ctx);

    const userAssessments = await listUserAssessmentsByUserId(
      ctx,
      currentUserId
    );

    const assessmentReportRows: ReportRowAssessment[] = (
      await Promise.all(
        userAssessments.map(async (ua) => {
          const assessment = await ctx.db.get(ua.assessmentId);
          if (!assessment) {
            throw createConvexError('ASSESSMENT_NOT_FOUND');
          }

          if (assessment.status !== 'completed') {
            return null;
          }

          const framework = await ctx.db.get(assessment.frameworkId);
          if (!framework) {
            throw createConvexError('FRAMEWORK_NOT_FOUND');
          }

          const domainResults = await listDomainResultsByAssessmentId(
            ctx,
            assessment._id
          );

          const domainReportRows: ReportRowDomain[] = (
            await Promise.all(
              domainResults.map(async (dr) => {
                const domain = await ctx.db.get(dr.domainId);

                if (!domain) {
                  throw createConvexError('DOMAIN_NOT_FOUND');
                }

                const sectionResults =
                  await listSectionResultsByAssessmentAndDomainId(
                    ctx,
                    assessment._id,
                    domain._id
                  );

                const sectionResultsWithSection: ReportRowSection[] = (
                  await Promise.all(
                    sectionResults.map(async (sr) => {
                      const section = await ctx.db.get(sr.sectionId);

                      if (!section) {
                        throw createConvexError('SECTION_NOT_FOUND');
                      }

                      const questionResults =
                        await listQuestionResultsByAssessmentAndSectionId(
                          ctx,
                          assessment._id,
                          section._id
                        );

                      const questionResultsWithQuestion: ReportRowQuestion[] = (
                        await Promise.all(
                          questionResults.map(async (qr) => {
                            const question = await ctx.db.get(qr.questionId);

                            if (!question) {
                              throw createConvexError('QUESTION_NOT_FOUND');
                            }

                            const responseOptions =
                              await listResponseOptionsByQuestionId(
                                ctx,
                                question._id
                              );

                            return {
                              ...qr,
                              question,
                              responseOptions,
                              rowLevel: 'question' as const,
                              assessmentId: assessment._id,
                            };
                          })
                        )
                      )
                        .sort((a, b) => a.question.order - b.question.order)
                        .map((qr, i) => ({
                          ...qr,
                          questionNumber: i + 1,
                        }));

                      return {
                        ...sr,
                        section,
                        rowLevel: 'section' as const,
                        assessmentId: assessment._id,
                        subRows: questionResultsWithQuestion,
                      };
                    })
                  )
                ).sort((a, b) => a.section.order - b.section.order);

                return {
                  ...dr,
                  domain,
                  rowLevel: 'domain' as const,
                  assessmentId: assessment._id,
                  subRows: sectionResultsWithSection,
                };
              })
            )
          ).sort((a, b) => a.domain.order - b.domain.order);

          return {
            ...assessment,
            framework,
            rowLevel: 'assessment' as const,
            subRows: domainReportRows,
          };
        })
      )
    ).filter((a) => a !== null);

    return assessmentReportRows;
  },
});

export type ActionRowAction = DataModel['actions']['document'] & {
  rowLevel: 'action';
  assignee: DataModel['users']['document'] | null;
  assessmentId: Id<'assessments'>;
};

export type ActionRowRisk = {
  rowLevel: 'risk';
  assessmentId: Id<'assessments'>;
  risk: 'black' | 'red' | 'amber' | 'green';
  subRows: ActionRowAction[];
};

export type ActionRowAssessment = DataModel['assessments']['document'] & {
  rowLevel: 'assessment';
  framework: DataModel['frameworks']['document'];
  subRows: ActionRowRisk[];
};

export type ActionRow = ActionRowAction | ActionRowRisk | ActionRowAssessment;

export const listActionRows = query({
  handler: async (ctx) => {
    const currentUserId = await getCurrentUserId(ctx);

    const userAssessments = await listUserAssessmentsByUserId(
      ctx,
      currentUserId
    );

    const assessmentActionRows: ActionRowAssessment[] = (
      await Promise.all(
        userAssessments.map(async (userAssessment) => {
          const assessment = await ctx.db.get(userAssessment.assessmentId);
          if (!assessment) {
            throw createConvexError('ASSESSMENT_NOT_FOUND');
          }

          if (assessment.status !== 'completed') {
            return null;
          }

          const framework = await ctx.db.get(assessment.frameworkId);
          if (!framework) {
            throw createConvexError('FRAMEWORK_NOT_FOUND');
          }

          const actions = await listActionsByAssessmentId(ctx, assessment._id);

          const actionsWithAssigneeAndComments = await Promise.all(
            actions.map(async (action) => {
              if (action.assigneeUserId) {
                const assignee = await ctx.db.get(action.assigneeUserId);
                return {
                  ...action,
                  assignee,
                };
              }
              return {
                ...action,
                assignee: null,
              };
            })
          );

          const riskActionRows: ActionRowRisk[] = risks
            .map((risk) => {
              const actionsForRisk = actionsWithAssigneeAndComments.filter(
                (action) => action.risk === risk
              );

              if (actionsForRisk.length === 0) {
                return null;
              }

              const actionActionRows: ActionRowAction[] = actionsForRisk.map(
                (action) => ({
                  ...action,
                  rowLevel: 'action' as const,
                  assessmentId: assessment._id,
                })
              );

              return {
                rowLevel: 'risk' as const,
                assessmentId: assessment._id,
                risk,
                subRows: actionActionRows,
              };
            })
            .filter((row) => row !== null);

          return {
            ...assessment,
            framework,
            rowLevel: 'assessment' as const,
            subRows: riskActionRows,
          };
        })
      )
    ).filter((a) => a !== null);

    return assessmentActionRows;
  },
});

// Mutations

export const create = mutation({
  args: {
    name: v.string(),
    frameworkId: v.id('frameworks'),
    selectedDomainIds: v.array(v.id('domains')),
    questionsTotal: v.number(),
    participantsUserIds: v.optional(v.array(v.id('users'))),
    startDate: v.optional(v.number()),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const currentUserId = await getCurrentUserId(ctx);
    const activeOrganisationId = await getActiveOrganisationId(ctx);

    const type = args.participantsUserIds ? 'board' : 'self';

    if (type === 'board') {
      // Check user is admin of organisation
      const isAdmin = await isAdminByCurrentUserAndActiveOrganisation(ctx);
      if (!isAdmin) {
        throw createConvexError('NOT_ADMIN_OF_ORGANISATION');
      }
    }

    if (!args.participantsUserIds) {
      args.participantsUserIds = [currentUserId];
    }

    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    const assessment = await ctx.db.insert('assessments', {
      name: args.name,
      status: 'not-started',
      type,
      maxScore: 0,
      actualScore: 0,
      calculatedScore: 0,
      startDate: args.startDate ?? Date.now(),
      dueDate: args.dueDate ?? threeMonthsFromNow.getTime(),
      createdBy: currentUserId,
      frameworkId: args.frameworkId,
      ...(type === 'board' && { organisationId: activeOrganisationId }),
      selectedDomainIds: args.selectedDomainIds,
      questionsTotal: args.questionsTotal,
    });

    await Promise.all(
      args.participantsUserIds.map((userId) =>
        ctx.db.insert('userAssessments', {
          userId,
          assessmentId: assessment,
          frameworkId: args.frameworkId,
          ...(type === 'board' && { organisationId: activeOrganisationId }),
          status: 'not-started',
          startDate: Date.now(),
          questionIndex: 0,
        })
      )
    );
  },
});

export const deleteById = mutation({
  args: { assessmentId: v.id('assessments') },
  handler: async (ctx, args) => {
    const assessment = await ctx.db.get(args.assessmentId);
    if (!assessment) {
      throw createConvexError('ASSESSMENT_NOT_FOUND');
    }

    const userAssessments = await listUserAssessmentsByAssessmentId(
      ctx,
      args.assessmentId
    );
    const questionResponses = (
      await Promise.all(
        userAssessments.map(
          async (ua) =>
            await listQuestionResponsesByUserAssessmentId(ctx, ua._id)
        )
      )
    ).flat();
    const questionResults = await listQuestionResultsByAssessmentId(
      ctx,
      args.assessmentId
    );
    const sectionResults = await listSectionResultsByAssessmentId(
      ctx,
      args.assessmentId
    );
    const domainResults = await listDomainResultsByAssessmentId(
      ctx,
      args.assessmentId
    );

    const actions = await listActionsByAssessmentId(ctx, args.assessmentId);

    // Delete everything

    await Promise.all(
      questionResults.map(async (qr) => await ctx.db.delete(qr._id))
    );
    await Promise.all(
      domainResults.map(async (dr) => await ctx.db.delete(dr._id))
    );
    await Promise.all(
      sectionResults.map(async (sr) => await ctx.db.delete(sr._id))
    );
    await Promise.all(
      questionResponses.map(async (qr) => await ctx.db.delete(qr._id))
    );
    await Promise.all(actions.map(async (a) => await ctx.db.delete(a._id)));
    await Promise.all(userAssessments.map(async (ua) => ctx.db.delete(ua._id)));
    await ctx.db.delete(args.assessmentId);
  },
});

export const randomCompleteForTesting = mutation({
  args: { assessmentId: v.id('assessments') },
  handler: async (ctx, { assessmentId }) => {
    // Generate random question responses for all questions in the assessment
    const assessment = await ctx.db.get(assessmentId);
    if (!assessment) {
      throw createConvexError('ASSESSMENT_NOT_FOUND');
    }

    const userAssessments = await listUserAssessmentsByAssessmentId(
      ctx,
      assessmentId
    );

    const selectedDomainIds = assessment.selectedDomainIds;

    const questions = (
      await Promise.all(
        selectedDomainIds.map(
          async (domainId) => await listQuestionsByDomainId(ctx, domainId)
        )
      )
    ).flat();

    // For each user assessment, for each question, create a random response
    await Promise.all(
      userAssessments.map(async (ua) => {
        await Promise.all(
          questions.map(async (question) => {
            // Get the response options for the question
            const responseOptions = await listResponseOptionsByQuestionId(
              ctx,
              question._id
            );

            const randomIndex = Math.floor(
              Math.random() * responseOptions.length
            );
            const responseOptionId = responseOptions[randomIndex]._id;

            // Create the question response
            await ctx.db.insert('questionResponses', {
              assessmentId: assessment._id,
              userAssessmentId: ua._id,
              questionId: question._id,
              responseOptionId,
            });
          })
        );

        // Update the userAssessment's progress
        await ctx.db.patch(ua._id, {
          status: 'completed',
        });
      })
    );

    // Generate the report and actions
    await generateAssessmentReportAndActions(ctx, assessmentId);
  },
});
