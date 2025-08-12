import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UnfoldClose({
  open,
  className,
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <ChevronUp
        className={cn(
          'size-3 translate-y-0.5 stroke-3 transition-transform',
          open ? 'translate-y-[7.5px]' : ''
        )}
      />
      <ChevronDown
        className={cn(
          '-translate-y-0.5 size-3 stroke-3 transition-transform',
          open ? '-translate-y-[7.5px]' : ''
        )}
      />
    </div>
  );
}
