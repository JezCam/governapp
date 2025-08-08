import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function Kbd({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        `pointer-events-none flex aspect-square h-5 select-none items-center justify-center gap-1 rounded border border-b-2 bg-background px-1 font-medium font-sans text-[0.7rem] text-muted-foreground transition-all group-hover/kbd:text-foreground [&_svg:not([class*='size-'])]:size-3`,
        className
      )}
    >
      {children}
    </kbd>
  );
}
