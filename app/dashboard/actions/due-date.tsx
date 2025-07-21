import { HugeiconsIcon } from "@hugeicons/react";
import { categoriseDueDate, cn } from "@/lib/utils";
import { dueDateCategoryIcons } from "./icons";

export default function DueDate({
  dueDate,
  className,
}: {
  dueDate: Date;
  className?: string;
}) {
  const { category, daysRemaining } = categoriseDueDate(dueDate);

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-muted-foreground text-xs",
        category === "soon" ? "text-amber-600 dark:text-amber-500" : "",
        category === "overdue" ? "text-red-600 dark:text-red-500" : "",
        className
      )}
    >
      <HugeiconsIcon
        className="size-3.5"
        icon={dueDateCategoryIcons[category]}
        strokeWidth={2}
      />
      <span className={`font-medium ${className}`}>
        {category === "overdue" && `Overdue by ${Math.abs(daysRemaining)} days`}
        {daysRemaining >= 0 && daysRemaining < 1 && "Due today"}
        {daysRemaining === 1 && "Due tomorrow"}
        {daysRemaining > 1 && `Due in ${daysRemaining} days`}
      </span>
    </div>
  );
}
