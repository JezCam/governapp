import type { SortDirection } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SortIndicator({
  sort,
  className,
}: {
  sort: false | SortDirection;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <ChevronUp
        className={cn(
          'size-2.5 translate-y-0.5 stroke-3',
          sort === 'asc' ? 'text-foreground' : ''
        )}
      />
      <ChevronDown
        className={cn(
          '-translate-y-0.5 size-2.5 stroke-3',
          sort === 'desc' ? 'text-foreground' : ''
        )}
      />
    </div>
  );
}
