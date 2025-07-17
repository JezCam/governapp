import { HugeiconsIcon } from '@hugeicons/react';
import {
  Appointment01Icon,
  Calendar04Icon,
  CalendarRemove01Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import type { ActionDueSummary } from '@/dummy-data/actions';

export default function DueDatesOverview({
  actionDueSummary,
}: {
  actionDueSummary: ActionDueSummary;
}) {
  const remaining =
    actionDueSummary.total - actionDueSummary.overdue - actionDueSummary.soon;

  return (
    <div className="flex items-center gap-2 font-medium text-red-600">
      {/* Overdue */}
      {!!actionDueSummary.overdue && (
        <div className="flex items-center gap-1">
          <HugeiconsIcon
            className="size-4"
            icon={CalendarRemove01Icon}
            strokeWidth={2}
          />
          {actionDueSummary.overdue}
        </div>
      )}
      {/* Soon */}
      {!!actionDueSummary.soon && (
        <div className="flex items-center gap-1 text-amber-600">
          <HugeiconsIcon
            className="size-4"
            icon={Calendar04Icon}
            strokeWidth={2}
          />
          {actionDueSummary.soon}
        </div>
      )}
      {/* Remaining */}
      {!!remaining && (
        <div className="flex items-center gap-1 text-gray-700">
          <HugeiconsIcon
            className="size-4"
            icon={Appointment01Icon}
            strokeWidth={2}
          />
          {remaining}
        </div>
      )}
    </div>
  );
}
