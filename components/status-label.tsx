import { HugeiconsIcon } from '@hugeicons/react';
import {
  CheckmarkCircle03Icon,
  DashedLineCircleIcon,
  Progress03Icon,
  UnavailableIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import type { assessmentStatuses } from '@/dummy-data/assessments';

export default function StatusLabel({
  status,
}: {
  status: (typeof assessmentStatuses)[number];
}) {
  if (status === 'not-started') {
    return (
      <>
        <HugeiconsIcon
          className="text-gray-600"
          icon={DashedLineCircleIcon}
          strokeWidth={2}
        />
        Not started
      </>
    );
  }
  if (status === 'in-progress') {
    return (
      <>
        <HugeiconsIcon className="text-amber-600" icon={Progress03Icon} />
        In progress
      </>
    );
  }
  if (status === 'closed') {
    return (
      <>
        <HugeiconsIcon
          className="text-red-600"
          icon={UnavailableIcon}
          strokeWidth={2}
        />
        Closed
      </>
    );
  }
  if (status === 'completed') {
    return (
      <>
        <HugeiconsIcon
          className="text-ga-green-600"
          icon={CheckmarkCircle03Icon}
          strokeWidth={2}
        />
        Completed
      </>
    );
  }
}
