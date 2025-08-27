import { Fragment } from 'react';
import FrameworkLabel from '@/components/labels/framework-label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type {
  AssessmentDomain,
  AssessmentQuestion,
  Section,
} from '@/types/convex';

export default function ProgressTree({
  domains,
  question,
  completed,
}: {
  domains: AssessmentDomain[];
  question: AssessmentQuestion;
  completed: boolean;
}) {
  const domainIndex = question.domainIndex;
  const sectionIndex = question.sectionIndex;
  const questionIndex = question.questionIndex;

  const getDomainProgress = (domain: AssessmentDomain, d: number) => {
    if (completed) {
      return domain.questionsTotal;
    }
    // Future Domain
    if (d > domainIndex) {
      return 0;
    }
    // Past Domain
    if (d < domainIndex) {
      return domain.questionsTotal;
    }
    // Current Domain
    return (
      domain.sections.slice(0, sectionIndex).reduce((acc, section) => {
        return acc + section.questionsTotal;
      }, 0) + questionIndex
    );
  };

  const getSectionProgress = (section: Section, d: number, s: number) => {
    if (completed) {
      return section.questionsTotal;
    }
    // Future domain
    if (d > domainIndex) {
      return 0;
    }
    // Past domain or current domain, past section
    if (d < domainIndex || (d === domainIndex && s < sectionIndex)) {
      return section.questionsTotal;
    }
    // Future section
    if (s > sectionIndex) {
      return 0;
    }
    // Current section
    return questionIndex;
  };

  return (
    <div className="flex h-full w-96 flex-col overflow-auto border-r">
      {domains.map((domain, d) => {
        const domainProgress = getDomainProgress(domain, d);

        return (
          <Fragment key={domain._id}>
            {/* Domains */}
            <div className="flex flex-col gap-2 border-ga-blue-200 border-t bg-ga-blue-50 p-4 first:border-0 dark:border-ga-blue-800 dark:bg-ga-blue-950">
              <FrameworkLabel name={domain.name} variant="domain" />
              <div className="flex items-center gap-2">
                <Progress
                  className="bg-ga-blue-600/20 dark:bg-ga-blue-500/20"
                  indicatorClassName="bg-ga-blue-600 dark:bg-ga-blue-500"
                  value={(domainProgress / domain.questionsTotal) * 100}
                />
                <span className="shrink-0 font-medium text-xs">
                  {domainProgress}/{domain.questionsTotal}
                </span>
              </div>
            </div>
            {/* Sections */}
            <div className="border-ga-blue-200 border-b bg-ga-blue-50 dark:border-ga-blue-800 dark:bg-ga-blue-950">
              {domain.sections.map((section, s) => {
                const sectionProgress = getSectionProgress(section, d, s);

                return (
                  <div className="group flex pl-4" key={section._id}>
                    <div
                      className={cn(
                        'flex w-full flex-col gap-2 border-ga-green-200 border-b border-l bg-ga-green-50 p-4 group-first:rounded-tl-md group-first:border-t group-last:border-b-0 dark:border-ga-green-800 dark:bg-ga-green-950',
                        d === question.domainIndex &&
                          s === question.sectionIndex
                          ? 'border-l-4 border-l-ga-green-400 bg-ga-green-100 dark:border-l-ga-green-600 dark:bg-ga-green-900'
                          : ''
                      )}
                    >
                      <FrameworkLabel name={section.name} variant="section" />
                      <div className="flex items-center gap-2">
                        <Progress
                          className="bg-ga-green-600/20 dark:bg-ga-green-500/20"
                          indicatorClassName="bg-ga-green-600 dark:bg-ga-green-500"
                          value={
                            (sectionProgress / section.questionsTotal) * 100
                          }
                        />
                        <span className="shrink-0 font-medium text-xs">
                          {sectionProgress}/{section.questionsTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
