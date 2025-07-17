import { HugeiconsIcon } from '@hugeicons/react';
import { dueDateCategoryIcons } from './icons';

export default function DueDatesOverview({
  total,
  overdue,
  soon,
}: {
  total: number;
  overdue: number;
  soon: number;
}) {
  const remaining = total - overdue - soon;

  return (
    <div className="flex items-center gap-2 font-medium text-red-600">
      {/* Overdue */}
      {!!overdue && (
        <div className="flex items-center gap-1">
          <HugeiconsIcon
            className="size-4"
            icon={dueDateCategoryIcons.overdue}
            strokeWidth={2}
          />
          {overdue}
        </div>
      )}
      {/* Soon */}
      {!!soon && (
        <div className="flex items-center gap-1 text-amber-600">
          <HugeiconsIcon
            className="size-4"
            icon={dueDateCategoryIcons.soon}
            strokeWidth={2}
          />
          {soon}
        </div>
      )}
      {/* Remaining */}
      {!!remaining && (
        <div className="flex items-center gap-1 text-muted-foreground">
          <HugeiconsIcon
            className="size-4"
            icon={dueDateCategoryIcons.upcoming}
            strokeWidth={2}
          />
          {remaining}
        </div>
      )}
    </div>
  );
}
