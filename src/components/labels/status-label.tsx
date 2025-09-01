import { HugeiconsIcon } from '@hugeicons/react';
import {
  CheckmarkCircle03Icon,
  DashedLineCircleIcon,
  Progress03Icon,
  UnavailableIcon,
} from '@hugeicons-pro/core-stroke-rounded';

export const statuses = [
  'not-started' as const,
  'in-progress' as const,
  'closed' as const,
  'blocked' as const,
  'completed' as const,
];

export default function StatusLabel({
  status,
}: {
  status: (typeof statuses)[number];
}) {
  if (status === 'not-started') {
    return (
      <>
        <HugeiconsIcon
          className="text-muted-foreground"
          icon={DashedLineCircleIcon}
          strokeWidth={2}
        />
        <span className="font-medium">Not started</span>
      </>
    );
  }
  if (status === 'in-progress') {
    return (
      <>
        <HugeiconsIcon
          className="text-amber-600 dark:text-amber-500"
          icon={Progress03Icon}
        />
        <span className="font-medium">In progress</span>
      </>
    );
  }
  if (status === 'closed') {
    return (
      <>
        <HugeiconsIcon
          className="text-red-600 dark:text-red-500"
          icon={UnavailableIcon}
          strokeWidth={2}
        />
        <span className="font-medium">Closed</span>
      </>
    );
  }
  if (status === 'blocked') {
    return (
      <>
        <HugeiconsIcon
          className="text-red-600 dark:text-red-500"
          icon={UnavailableIcon}
          strokeWidth={2}
        />
        <span className="font-medium">Blocked</span>
      </>
    );
  }
  if (status === 'completed') {
    return (
      <>
        <HugeiconsIcon
          className="text-ga-green-600 dark:text-ga-green-500"
          icon={CheckmarkCircle03Icon}
          strokeWidth={2}
        />
        <span className="font-medium">Completed</span>
      </>
    );
  }
}
