import { Fragment } from 'react';
import FrameworkLabel from '@/components/labels/framework-label';
import { Progress } from '@/components/ui/progress';
import { domains } from '@/dummy-data/domains';
import { cn } from '@/lib/utils';

export default function ProgressTree() {
  return (
    <div className="flex h-full w-96 flex-col overflow-auto border-r">
      {domains.map((domain) => (
        <Fragment key={domain.id}>
          {/* Domains */}
          <div className="flex flex-col gap-2 border-ga-blue-200 border-t bg-ga-blue-50 p-4 first:border-0 dark:border-ga-blue-800 dark:bg-ga-blue-950">
            <FrameworkLabel name={domain.name} variant="domain" />
            <div className="flex items-center gap-2">
              <Progress
                className="bg-ga-blue-600/20 dark:bg-ga-blue-500/20"
                indicatorClassName="bg-ga-blue-600 dark:bg-ga-blue-500"
                value={(domain.current / domain.total) * 100}
              />
              <span className="shrink-0 font-medium text-xs">
                {domain.current}/{domain.total}
              </span>
            </div>
          </div>
          {/* Sections */}
          <div className="bg-ga-blue-50 last:border-b-0 dark:bg-ga-blue-950">
            {domain.sections.map((section) => (
              <div className="group flex pl-4" key={section.id}>
                <div
                  className={cn(
                    'flex w-full flex-col gap-2 border-ga-green-200 border-b border-l bg-ga-green-50 p-4 group-first:rounded-tl-md group-first:border-t group-last:border-b-0 dark:border-ga-green-800 dark:bg-ga-green-950',
                    domain.id === 0 && section.id === 1
                      ? 'border-l-4 border-l-ga-green-400 bg-ga-green-100 dark:border-l-ga-green-600 dark:bg-ga-green-900'
                      : ''
                  )}
                >
                  <FrameworkLabel name={section.name} variant="section" />
                  <div className="flex items-center gap-2">
                    <Progress
                      className="bg-ga-green-600/20 dark:bg-ga-green-500/20"
                      indicatorClassName="bg-ga-green-600 dark:bg-ga-green-500"
                      value={(section.current / section.total) * 100}
                    />
                    <span className="shrink-0 font-medium text-xs">
                      {section.current}/{section.total}
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
