'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  TaskDoneIcon,
  TaskIcon,
  UserGroupIcon,
  ZapIcon,
} from '@hugeicons-pro/core-bulk-rounded';
import {
  ArrowUpRight03Icon,
  PlusSignIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import Link from 'next/link';
import { useState } from 'react';
import AddTeamMemberDialog from '@/components/dialogs/add-team-member-dialog';
import NewAssessmentDialog from '@/components/dialogs/new-assessment-dialog';
import { Button } from '@/components/ui/button';

export default function HomeActions() {
  const [newAssessmentOpen, setNewAssessmentOpen] = useState(false);
  const [addTeamMemberOpen, setAddTeamMemberOpen] = useState(false);

  return (
    <>
      <NewAssessmentDialog
        onOpenChange={setNewAssessmentOpen}
        open={newAssessmentOpen}
      />
      <AddTeamMemberDialog
        onOpenChange={setAddTeamMemberOpen}
        open={addTeamMemberOpen}
      />
      <div className="grid w-full grid-cols-4 gap-4">
        <Button
          className="group h-fit flex-col justify-start gap-2 rounded-2xl p-2 hover:border-ga-purple-300 hover:bg-background dark:hover:border-ga-purple-800"
          onClick={() => setNewAssessmentOpen(true)}
          variant="outline"
        >
          <div className="relative flex w-full items-center justify-center overflow-hidden rounded-md border bg-accent py-8">
            <div className="group-hover:-translate-y-1 relative flex size-18 shrink-0 items-center justify-center rounded-lg border border-ga-purple-300 bg-gradient-to-b from-ga-purple-100 to-ga-purple-200 shadow-highlight transition-transform group-hover:scale-105 dark:border-ga-purple-900 dark:from-ga-purple-950 dark:to-gray-900 dark:shadow-sm">
              <HugeiconsIcon
                className="size-12 text-ga-purple-600 dark:text-ga-purple-500"
                icon={TaskIcon}
              />
              <div className="-right-2 -bottom-2 absolute flex size-6 items-center justify-center rounded-md border border-ga-purple-700 bg-ga-purple-600 shadow-highlight">
                <HugeiconsIcon
                  className="size-4 text-white"
                  icon={PlusSignIcon}
                  strokeWidth={2}
                />
              </div>
            </div>
            <div className="-bottom-1 absolute h-1 w-full shadow-[0_0_24px_0_var(--color-ga-purple-500)] transition-shadow group-hover:shadow-[0_0_64px_8px_var(--color-ga-purple-500)] dark:shadow-[0_0_24px_0_var(--color-ga-purple-700)] dark:group-hover:shadow-[0_0_64px_8px_var(--color-ga-purple-700)]" />
          </div>
          <h2 className="my-1 font-medium text-base">New assessment</h2>
        </Button>
        <Button
          className="group h-fit flex-col justify-start gap-2 rounded-2xl p-2 hover:border-ga-blue-300 hover:bg-background dark:hover:border-ga-blue-800"
          onClick={() => setAddTeamMemberOpen(true)}
          variant="outline"
        >
          <div className="relative flex w-full items-center justify-center overflow-hidden rounded-md border bg-accent py-8">
            <div className="group-hover:-translate-y-1 relative flex size-18 shrink-0 items-center justify-center rounded-lg border border-ga-blue-300 bg-gradient-to-b from-ga-blue-100 to-ga-blue-200 shadow-highlight transition-transform group-hover:scale-105 dark:border-ga-blue-900 dark:from-ga-blue-950 dark:to-gray-900 dark:shadow-sm">
              <HugeiconsIcon
                className="size-12 text-ga-blue-600 dark:text-ga-blue-500"
                icon={UserGroupIcon}
              />
              <div className="-right-2 -bottom-2 absolute flex size-6 items-center justify-center rounded-md border border-ga-blue-700 bg-ga-blue-600 shadow-highlight">
                <HugeiconsIcon
                  className="size-4 text-white"
                  icon={PlusSignIcon}
                  strokeWidth={2}
                />
              </div>
            </div>
            <div className="-bottom-1 absolute h-1 w-full shadow-[0_0_24px_0_var(--color-ga-blue-500)] transition-shadow group-hover:shadow-[0_0_64px_8px_var(--color-ga-blue-500)] dark:shadow-[0_0_24px_0_var(--color-ga-blue-700)] dark:group-hover:shadow-[0_0_64px_8px_var(--color-ga-blue-700)]" />
          </div>
          <h2 className="my-1 font-medium text-base">Add team member</h2>
        </Button>
        <Button
          asChild
          className="group h-fit flex-col justify-start gap-2 rounded-2xl p-2 hover:border-ga-green-300 hover:bg-background dark:hover:border-ga-green-800"
          variant="outline"
        >
          <Link href="/dashboard/assessments">
            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-md border bg-accent py-8">
              <div className="group-hover:-translate-y-1 relative flex size-18 shrink-0 items-center justify-center rounded-lg border border-ga-green-300 bg-gradient-to-b from-ga-green-100 to-ga-green-200 shadow-highlight transition-transform group-hover:scale-105 dark:border-ga-green-900 dark:from-ga-green-950 dark:to-gray-900 dark:shadow-sm">
                <HugeiconsIcon
                  className="size-12 text-ga-green-600 dark:text-ga-green-500"
                  icon={TaskDoneIcon}
                />
                <div className="-right-2 -bottom-2 absolute flex size-6 items-center justify-center rounded-md border border-ga-green-700 bg-ga-green-600 shadow-highlight">
                  <HugeiconsIcon
                    className="size-4 text-white"
                    icon={ArrowUpRight03Icon}
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="-bottom-1 absolute h-1 w-full shadow-[0_0_24px_0_var(--color-ga-green-500)] transition-shadow group-hover:shadow-[0_0_64px_8px_var(--color-ga-green-500)] dark:shadow-[0_0_24px_0_var(--color-ga-green-700)] dark:group-hover:shadow-[0_0_64px_8px_var(--color-ga-green-700)]" />
            </div>
            <h2 className="my-1 font-medium text-base">
              View your assessments
            </h2>
          </Link>
        </Button>
        <Button
          asChild
          className="group h-fit flex-col justify-start gap-2 rounded-2xl p-2 hover:border-ga-purple-300 hover:bg-background dark:hover:border-ga-purple-800"
          variant="outline"
        >
          <Link href="/dashboard/actions?assignee=0">
            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-md border bg-accent py-8">
              <div className="group-hover:-translate-y-1 relative flex size-18 shrink-0 items-center justify-center rounded-lg border border-ga-purple-300 bg-gradient-to-b from-ga-purple-100 to-ga-purple-200 shadow-highlight transition-transform group-hover:scale-105 dark:border-ga-purple-900 dark:from-ga-purple-950 dark:to-gray-900 dark:shadow-sm">
                <HugeiconsIcon
                  className="size-12 text-ga-purple-600 dark:text-ga-purple-500"
                  icon={ZapIcon}
                />
                <div className="-right-2 -bottom-2 absolute flex size-6 items-center justify-center rounded-md border border-ga-purple-700 bg-ga-purple-600 shadow-highlight">
                  <HugeiconsIcon
                    className="size-4 text-white"
                    icon={ArrowUpRight03Icon}
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="-bottom-1 absolute h-1 w-full shadow-[0_0_24px_0_var(--color-ga-purple-500)] transition-shadow group-hover:shadow-[0_0_64px_8px_var(--color-ga-purple-500)] dark:shadow-[0_0_24px_0_var(--color-ga-purple-700)] dark:group-hover:shadow-[0_0_64px_8px_var(--color-ga-purple-700)]" />
            </div>
            <h2 className="my-1 font-medium text-base">View your actions</h2>
          </Link>
        </Button>
      </div>
    </>
  );
}
