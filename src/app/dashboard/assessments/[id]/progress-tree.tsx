import { Fragment } from 'react';
import FrameworkLabel from '@/components/labels/framework-label';
import { Progress } from '@/components/ui/progress';
import { domains } from '@/dummy-data/domains';

export default function ProgressTree() {
  return (
    <div className="flex h-full w-96 flex-col overflow-auto border-r">
      {domains.map((domain) => (
        <Fragment key={domain.id}>
          {/* Domains */}
          <div className="flex flex-col gap-2 border-b bg-ga-blue-500/5 p-4">
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
          <div className="border-b last:border-b-0">
            {domain.sections.map((section) => (
              <div
                className="group last:-mb-px flex bg-ga-green-500/5 pl-4"
                key={section.id}
              >
                <div className="-mr-px w-px grow bg-border group-last:hidden" />
                <div className="flex w-full flex-col gap-2 rounded-bl-xl border-b border-l p-4">
                  <FrameworkLabel name={domain.name} variant="section" />
                  <div className="flex items-center gap-2">
                    <Progress
                      className="bg-ga-green-600/20 dark:bg-ga-green-500/20"
                      indicatorClassName="bg-ga-green-600 dark:bg-ga-green-500"
                      value={(domain.current / domain.total) * 100}
                    />
                    <span className="shrink-0 font-medium text-xs">
                      {domain.current}/{domain.total}
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
