/** biome-ignore-all lint/nursery/noShadow: <explanation> */
import type { Id } from './_generated/dataModel';
import { internalMutation } from './_generated/server';
import { domains } from './beta_exports/domains';
import { frameworks } from './beta_exports/frameworks';
import { questions } from './beta_exports/questions';
import { responseOptions } from './beta_exports/response_options';
import { sections } from './beta_exports/sections';

export const seedFrameworks = internalMutation({
  handler: ({ db }) => {
    const frameworksToSeed = frameworks.map((framework) => ({
      beta_id: framework.id,
      name: framework.name,
      type: 'board' as 'individual' | 'board',
      summary: framework.summary,
      blackMax: Number.parseFloat(framework.black_max),
      redMax: Number.parseFloat(framework.red_max),
      amberMax: Number.parseFloat(framework.amber_max),
      reportBlack: framework.report_black,
      reportRed: framework.report_red,
      reportAmber: framework.report_amber,
      reportGreen: framework.report_green,
      legislation: framework.legislation ? framework.legislation : undefined,
      authority: framework.authority,
      description: framework.description,
    }));

    for (const framework of frameworksToSeed) {
      db.insert('frameworks', framework);
    }
  },
});

export const seedDomains = internalMutation({
  handler: async ({ db }) => {
    const frameworkIds = await db.query('frameworks').collect();

    const frameworkMap = new Map(
      frameworkIds.map((framework) => [framework.beta_id, framework._id])
    );

    const domainsToSeed = domains
      .filter((domain) => frameworkMap.has(domain.framework_id))
      .map((domain) => ({
        beta_id: domain.id,
        order: Number.parseInt(domain.order, 10),
        name: domain.name,
        description: domain.description,
        questionsTotal: 0, // This will be updated later
        questionsOffset: 0, // This will be updated later
        blackMax: Number.parseFloat(domain.black_max),
        redMax: Number.parseFloat(domain.red_max),
        amberMax: Number.parseFloat(domain.amber_max),
        reportBlack: domain.report_black,
        reportRed: domain.report_red,
        reportAmber: domain.report_amber,
        reportGreen: domain.report_green,
        frameworkId: frameworkMap.get(domain.framework_id) as Id<'frameworks'>,
      }));

    for (const domain of domainsToSeed) {
      db.insert('domains', domain);
    }
  },
});

export const seedSections = internalMutation({
  handler: async ({ db }) => {
    const frameworkIds = await db.query('frameworks').collect();
    const domainIds = await db.query('domains').collect();

    const frameworkMap = new Map(
      frameworkIds.map((framework) => [framework.beta_id, framework._id])
    );

    const domainMap = new Map(
      domainIds.map((domain) => [domain.beta_id, domain._id])
    );

    const sectionsToSeed = sections
      .filter((section) => {
        const frameworkId = section.framework_id;
        const domainId = section.domain_id;

        return frameworkMap.has(frameworkId) && domainMap.has(domainId);
      })
      .map((section) => ({
        beta_id: section.id,
        order: Number.parseInt(section.order, 10),
        name: section.name,
        description: section.description,
        questionsTotal: 0, // This will be updated later
        questionsOffset: 0, // This will be updated later
        blackMax: Number.parseFloat(section.black_max),
        redMax: Number.parseFloat(section.red_max),
        amberMax: Number.parseFloat(section.amber_max),
        reportBlack: section.report_black,
        reportRed: section.report_red,
        reportAmber: section.report_amber,
        reportGreen: section.report_green,
        domainId: domainMap.get(section.domain_id) as Id<'domains'>,
        frameworkId: frameworkMap.get(section.framework_id) as Id<'frameworks'>,
      }));

    for (const section of sectionsToSeed) {
      db.insert('sections', section);
    }
  },
});

export const seedQuestions = internalMutation({
  handler: async ({ db }) => {
    const frameworks = await db.query('frameworks').collect();
    const domains = await db.query('domains').collect();
    const sections = await db.query('sections').collect();

    const frameworkMap = new Map(
      frameworks.map((framework) => [framework.beta_id, framework._id])
    );

    const sectionMap = new Map(
      sections.map((section) => [section.beta_id, section._id])
    );

    const questionsToSeed = questions
      .filter((question) => {
        const frameworkId = question.framework_id;
        const sectionId = question.section_id;

        return frameworkMap.has(frameworkId) && sectionMap.has(sectionId);
      })
      .map(async (question) => {
        const sectionId = sectionMap.get(question.section_id);
        if (!sectionId) {
          throw new Error(`Section not found for question ${question.id}`);
        }
        const section = await db.get(sectionId);
        if (!section) {
          throw new Error(`Section not found for question ${question.id}`);
        }

        // Get domainId
        const domain = await db.get(section.domainId);

        if (!domain) {
          throw new Error(
            `Domain not found for section ${question.section_id}`
          );
        }

        return {
          beta_id: question.id,
          order: Number.parseInt(question.order, 10),
          text: question.text,
          explanatory: question.explanatory ?? '',
          weight: Number.parseFloat(question.weight),
          modelSolutionUrl: question.link_to_model_solution ?? undefined,
          modelSolutionAuthority:
            question.model_solution_authority ?? undefined,
          frameworkId: frameworkMap.get(
            question.framework_id
          ) as Id<'frameworks'>,
          domainId: domain._id,
          sectionId,
        };
      });

    const resolvedQuestions = await Promise.all(questionsToSeed);

    const frameworksTotalQuestions = new Map<string, number>();
    const sectionsTotalQuestions = new Map<string, number>();
    const domainsTotalQuestions = new Map<string, number>();

    for (const question of resolvedQuestions) {
      const frameworkId = question.frameworkId.toString();
      const sectionId = question.sectionId.toString();
      const domainId = question.domainId.toString();

      // Update framework total questions
      frameworksTotalQuestions.set(
        frameworkId,
        (frameworksTotalQuestions.get(frameworkId) || 0) + 1
      );

      // Update section total questions
      sectionsTotalQuestions.set(
        sectionId,
        (sectionsTotalQuestions.get(sectionId) || 0) + 1
      );

      // Update domain total questions
      domainsTotalQuestions.set(
        domainId,
        (domainsTotalQuestions.get(domainId) || 0) + 1
      );
    }

    const domainsWithSectionsSorted = domains.map((domain) => ({
      ...domain,
      sections: sections
        .filter((section) => section.domainId === domain._id)
        .sort((a, b) => a.order - b.order),
    }));
    const frameworksWithDomainsSorted = frameworks.map((framework) => ({
      ...framework,
      domains: domainsWithSectionsSorted
        .filter((domain) => domain.frameworkId === framework._id)
        .sort((a, b) => a.order - b.order),
    }));

    const domainOffsets = new Map<string, number>();

    for (const framework of frameworksWithDomainsSorted) {
      // Update each domain with total questions
      let totalDomainQuestions = 0;
      for (const domain of framework.domains) {
        const subtotalDomainQuestions =
          domainsTotalQuestions.get(domain._id.toString()) || 0;

        db.patch(domain._id, {
          questionsTotal: subtotalDomainQuestions,
          questionsOffset: totalDomainQuestions,
        });

        domainOffsets.set(domain._id.toString(), totalDomainQuestions);
        totalDomainQuestions += subtotalDomainQuestions;
      }
    }

    const sectionOffsets = new Map<string, number>();

    for (const domain of domainsWithSectionsSorted) {
      // Update each section with total questions
      let totalSectionQuestions = 0;
      for (const section of domain.sections) {
        const subtotalSectionQuestions =
          sectionsTotalQuestions.get(section._id.toString()) || 0;

        db.patch(section._id, {
          questionsTotal: subtotalSectionQuestions,
          questionsOffset: totalSectionQuestions,
        });

        sectionOffsets.set(section._id.toString(), totalSectionQuestions);
        totalSectionQuestions += subtotalSectionQuestions;
      }
    }

    // insert each question with offsets to create total index
    const questionsToInsert = resolvedQuestions.map((question) => ({
      ...question,
      order:
        question.order +
        (domainOffsets.get(question.domainId.toString()) || 0) +
        (sectionOffsets.get(question.sectionId.toString()) || 0),
    }));

    await Promise.all(
      questionsToInsert.map((question) => db.insert('questions', question))
    );
  },
});

export const seedResponseOptions = internalMutation({
  handler: async ({ db }) => {
    const questionIds = await db.query('questions').collect();

    const questionMap = new Map(
      questionIds.map((question) => [question.beta_id, question._id])
    );

    const riskLevelMap = new Map<string, 'green' | 'amber' | 'red' | 'black'>([
      ['10', 'green'],
      ['20', 'amber'],
      ['30', 'red'],
      ['40', 'black'],
    ]);

    const responseOptionsToSeed = responseOptions
      .filter((responseOption) => questionMap.has(responseOption.question_id))
      .map((responseOption) => ({
        text: responseOption.text,
        score: Number.parseFloat(responseOption.score),
        riskLevel: riskLevelMap.get(responseOption.risk_id) ?? 'green',
        order: Number.parseInt(responseOption.order, 10),
        isValidNA: responseOption.is_na === '1',
        triggersAction: responseOption.is_triggering_action === '1',
        actionText: responseOption.action_text ?? undefined,
        questionId: questionMap.get(
          responseOption.question_id
        ) as Id<'questions'>,
      }));

    for (const responseOption of responseOptionsToSeed) {
      db.insert('responses', responseOption);
    }
  },
});
