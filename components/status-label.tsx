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
        <span className="font-medium">Not started</span>
      </>
    );
  }
  if (status === 'in-progress') {
    return (
      <>
        <HugeiconsIcon className="text-amber-600" icon={Progress03Icon} />
        <span className="font-medium">In progress</span>
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
        <span className="font-medium">Closed</span>
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
        <span className="font-medium">Completed</span>
      </>
    );
  }
}
