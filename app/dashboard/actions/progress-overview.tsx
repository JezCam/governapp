export default function ProgressOverview({
  completed,
  inProgress,
  total,
}: {
  completed: number;
  inProgress: number;
  total: number;
}) {
  const completedPercentage = (completed / total) * 100;
  const inProgressPercentage = ((inProgress + completed) / total) * 100;

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <div
          className="absolute h-full w-full flex-1 bg-amber-500 transition-all"
          style={{
            transform: `translateX(-${100 - inProgressPercentage}%)`,
          }}
        />
        <div
          className="absolute h-full w-full flex-1 bg-ga-green-500 transition-all"
          style={{ transform: `translateX(-${100 - completedPercentage}%)` }}
        />
      </div>
      <span className="font-medium text-xs">{`${completed}/${total}`}</span>
    </div>
  );
}
