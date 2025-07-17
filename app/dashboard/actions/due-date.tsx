import { HugeiconsIcon, type HugeiconsIconProps } from '@hugeicons/react';
import {
  Appointment01Icon,
  Calendar04Icon,
  CalendarRemove01Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import { cn } from '@/lib/utils';

const DUE_SOON_THRESHOLD = 7;

export default function DueDate({
  dueDate,
  className,
}: {
  dueDate: Date;
  className?: string;
}) {
  const today = new Date();
  const daysRemaining = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let icon: HugeiconsIconProps['icon'];
  if (daysRemaining < 0) {
    icon = CalendarRemove01Icon;
  } else if (daysRemaining <= DUE_SOON_THRESHOLD) {
    icon = Calendar04Icon;
  } else {
    icon = Appointment01Icon;
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1 text-gray-700 text-xs',
        daysRemaining <= DUE_SOON_THRESHOLD ? 'text-amber-600' : '',
        daysRemaining < 0 ? 'text-red-600' : '',
        className
      )}
    >
      <HugeiconsIcon className="size-3.5" icon={icon} strokeWidth={2} />
      <span className={`font-medium ${className}`}>
        {daysRemaining < 0 && `Overdue by ${Math.abs(daysRemaining)} days`}
        {daysRemaining >= 0 && daysRemaining < 1 && 'Due today'}
        {daysRemaining === 1 && 'Due tomorrow'}
        {daysRemaining > 1 && `Due in ${daysRemaining} days`}
      </span>
    </div>
  );
}
