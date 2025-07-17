import { Progress } from '@/components/ui/progress';

export default function ProgressOverview({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Progress value={(completed / total) * 100} />
      <span className="font-medium text-xs">{`${completed}/${total}`}</span>
    </div>
  );
}
