import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UnfoldClose({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <ChevronUp className="size-3 translate-y-0.5 stroke-3 transition-all group-data-[state=open]:translate-y-[7.5px]" />
      <ChevronDown className="-translate-y-0.5 group-data-[state=open]:-translate-y-[7.5px] size-3 stroke-3 transition-all" />
    </div>
  );
}
