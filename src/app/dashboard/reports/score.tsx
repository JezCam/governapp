import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function Score({
  value,
  variant,
}: {
  value: number;
  variant: 'assessment' | 'domain' | 'section';
}) {
  return (
    <div className="flex items-center gap-2">
      <Progress
        className={cn(
          variant === 'domain'
            ? 'bg-ga-blue-600/20 dark:bg-ga-blue-500/20'
            : '',
          variant === 'section'
            ? 'bg-ga-green-600/20 dark:bg-ga-green-500/20'
            : ''
        )}
        indicatorClassName={cn(
          variant === 'domain' ? 'bg-ga-blue-600 dark:bg-ga-blue-500' : '',
          variant === 'section' ? 'bg-ga-green-600 dark:bg-ga-green-500' : ''
        )}
        value={value}
      />
      <span className="font-medium">{value}%</span>
    </div>
  );
}
