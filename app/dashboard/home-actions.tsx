import { HugeiconsIcon } from '@hugeicons/react';
import {
  TaskAdd02Icon,
  TaskDone02Icon,
  UserAdd01Icon,
  ZapIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomeActions() {
  return (
    <div className="grid w-full grid-cols-4 gap-4">
      <Button
        className="h-fit flex-row justify-start gap-4 rounded-xl p-4 hover:border-ga-purple-300 hover:bg-background dark:hover:border-ga-purple-800"
        variant="outline"
      >
        <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-ga-purple-50 dark:bg-ga-purple-950/50">
          <HugeiconsIcon
            className="size-8 text-ga-purple-500"
            icon={TaskAdd02Icon}
          />
        </div>
        <div className="flex flex-col items-start text-foreground">
          <h2 className="font-medium text-lg">New Assessment</h2>
          <p className="text-muted-foreground">Create a new assessment</p>
        </div>
      </Button>
      <Button
        className="h-fit flex-row justify-start gap-4 rounded-xl p-4 hover:border-ga-blue-300 hover:bg-background dark:hover:border-ga-blue-800"
        variant="outline"
      >
        <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-ga-blue-50 dark:bg-ga-blue-950/50">
          <HugeiconsIcon
            className="size-8 text-ga-blue-500"
            icon={UserAdd01Icon}
          />
        </div>
        <div className="flex flex-col items-start text-foreground">
          <h2 className="font-medium text-lg">Add Team Member</h2>
          <p className="text-muted-foreground">Invite a member to your team</p>
        </div>
      </Button>
      <Button
        asChild
        className="h-fit flex-row justify-start gap-4 rounded-xl p-4 hover:border-ga-green-300 hover:bg-background dark:hover:border-ga-green-800"
        variant="outline"
      >
        <Link href="/dashboard/assessments">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-ga-green-50 dark:bg-ga-green-950/50">
            <HugeiconsIcon
              className="size-8 text-ga-green-500"
              icon={TaskDone02Icon}
            />
          </div>
          <div className="flex flex-col items-start text-foreground">
            <h2 className="font-medium text-lg">View Assessments</h2>
            <p className="text-muted-foreground">
              View your assessment results
            </p>
          </div>
        </Link>
      </Button>
      <Button
        asChild
        className="h-fit flex-row justify-start gap-4 rounded-xl p-4 hover:border-ga-purple-300 hover:bg-background dark:hover:border-ga-purple-800"
        variant="outline"
      >
        <Link href="/dashboard/actions">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-ga-purple-50 dark:bg-ga-purple-950/50">
            <HugeiconsIcon
              className="size-8 text-ga-purple-500"
              icon={ZapIcon}
            />
          </div>
          <div className="flex flex-col items-start text-foreground">
            <h2 className="font-medium text-lg">View Actions</h2>
            <p className="text-muted-foreground">View or update your actions</p>
          </div>
        </Link>
      </Button>
    </div>
  );
}
