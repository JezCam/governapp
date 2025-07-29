import { HugeiconsIcon } from '@hugeicons/react';
import {
  Alert02Icon,
  CheckmarkBadge03Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import type { Risk } from '@/dummy-data/risk';

export default function RiskLabel({ risk }: { risk: Risk }) {
  if (risk === 'green') {
    return (
      <>
        <HugeiconsIcon
          className="text-ga-green-600 dark:text-ga-green-100"
          icon={CheckmarkBadge03Icon}
          strokeWidth={2}
        />
        <span className="font-medium">Green</span>
      </>
    );
  }
  if (risk === 'amber') {
    return (
      <>
        <HugeiconsIcon
          className="text-amber-600 dark:text-amber-100"
          icon={Alert02Icon}
          strokeWidth={2}
        />
        <span className="font-medium">Amber</span>
      </>
    );
  }
  if (risk === 'red') {
    return (
      <>
        <HugeiconsIcon
          className="text-red-600 dark:text-red-100"
          icon={Alert02Icon}
          strokeWidth={2}
        />
        <span className="font-medium">Red</span>
      </>
    );
  }
  if (risk === 'black') {
    return (
      <>
        <HugeiconsIcon
          className="text-gray-600 dark:text-gray-100"
          icon={Alert02Icon}
          strokeWidth={2}
        />
        <span className="font-medium">Black</span>
      </>
    );
  }
}
