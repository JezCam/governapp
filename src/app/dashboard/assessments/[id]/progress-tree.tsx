import { Fragment } from 'react';
import FrameworkLabel from '@/components/labels/framework-label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Domain, Section } from '@/types/convex';

export default function ProgressTree({
  domains,
  domainIndex,
  sectionIndex,
  questionIndex,
}: {
  domains: (Domain & { sections: Section[] })[];
  domainIndex: number;
  sectionIndex: number;
  questionIndex: number;
}) {
  const getDomainProgress = (d: number) => {
    const currentDomain = domains[d];
    if (d < domainIndex) {
      return currentDomain.questionsTotal;
    }
    if (d > domainIndex) {
      return 0;
    }
    return currentDomain.sections[sectionIndex].questionsOffset + questionIndex;
  };

  const getSectionProgress = (d: number, s: number) => {
    if (d < domainIndex || s < sectionIndex) {
      return domains[d].sections[s].questionsTotal;
    }
    if (s > sectionIndex) {
      return 0;
    }
    return questionIndex;
  };

  return (
    <div className="flex h-full w-96 flex-col overflow-auto border-r">
      {domains.map((domain, d) => (
        <Fragment key={domain._id}>
          {/* Domains */}
          <div className="flex flex-col gap-2 border-ga-blue-200 border-t bg-ga-blue-50 p-4 first:border-0 dark:border-ga-blue-800 dark:bg-ga-blue-950">
            <FrameworkLabel name={domain.name} variant="domain" />
            <div className="flex items-center gap-2">
              <Progress
                className="bg-ga-blue-600/20 dark:bg-ga-blue-500/20"
                indicatorClassName="bg-ga-blue-600 dark:bg-ga-blue-500"
                value={(getDomainProgress(d) / domain.questionsTotal) * 100}
              />
              <span className="shrink-0 font-medium text-xs">
                {getDomainProgress(d)}/{domain.questionsTotal}
              </span>
            </div>
          </div>
          {/* Sections */}
          <div className="border-ga-blue-200 border-b bg-ga-blue-50 dark:border-ga-blue-800 dark:bg-ga-blue-950">
            {domain.sections.map((section, s) => (
              <div className="group flex pl-4" key={section._id}>
                <div
                  className={cn(
                    'flex w-full flex-col gap-2 border-ga-green-200 border-b border-l bg-ga-green-50 p-4 group-first:rounded-tl-md group-first:border-t group-last:border-b-0 dark:border-ga-green-800 dark:bg-ga-green-950',
                    d === domainIndex && s === sectionIndex
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
                        (getSectionProgress(d, s) / section.questionsTotal) *
                        100
                      }
                    />
                    <span className="shrink-0 font-medium text-xs">
                      {getSectionProgress(d, s)}/{section.questionsTotal}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
