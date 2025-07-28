import { HugeiconsIcon } from '@hugeicons/react';
import { Hexagon01Icon } from '@hugeicons-pro/core-solid-rounded';
import { SquareIcon, TriangleIcon } from '@hugeicons-pro/core-solid-standard';

export default function FrameworkLabel({
  variant,
  name,
}: {
  variant: 'framework' | 'domain' | 'section';
  name: string;
}) {
  const colourMap = {
    framework: 'text-primary',
    domain: 'text-ga-blue-600 dark:text-ga-blue-500',
    section: 'text-ga-green-600 dark:text-ga-green-500',
  };
  const iconMap = {
    framework: Hexagon01Icon,
    domain: TriangleIcon,
    section: SquareIcon,
  };

  return (
    <div className="flex items-center gap-1">
      <HugeiconsIcon
        className={`!size-3.5 ${colourMap[variant]}`}
        icon={iconMap[variant]}
      />
      <span
        className={`line-clamp-1 truncate font-medium ${colourMap[variant]} text-sm`}
      >
        {name}
      </span>
    </div>
  );
}
