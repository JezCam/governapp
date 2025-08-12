import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ExpandChevron({
  expanded,
  className,
}: {
  expanded: boolean;
  className?: string;
}) {
  return (
    <ChevronRight
      className={cn(
        'text-muted-foreground transition-transform',
        expanded ? 'rotate-90' : '',
        className
      )}
      size={16}
    />
  );
}
