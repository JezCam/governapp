import { cn } from '@/lib/utils';

export default function NonExpandingCell({
  expanded,
  children,
  className,
}: {
  expanded?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex px-3 py-2',
        expanded ? 'items-start' : 'items-center',
        className
      )}
    >
      {children}
    </div>
  );
}
