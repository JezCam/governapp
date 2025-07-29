'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { UserGroupIcon, UserIcon } from '@hugeicons-pro/core-bulk-rounded';
import { PlusSignIcon } from '@hugeicons-pro/core-stroke-rounded';
import { useState } from 'react';
import CreateBoardAssessmentForm from '../forms/create-board-assessment-form';
import CreateSelfAssessmentForm from '../forms/create-self-assessment-form';
import { Button } from '../ui/button';
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackDescription,
  DialogStackHeader,
  type DialogStackProps,
  DialogStackTitle,
} from '../ui/kibo-ui/dialog-stack';

export default function NewAssessmentDialog({ ...props }: DialogStackProps) {
  const [index, setIndex] = useState<number>(0);
  const [type, setType] = useState<'self' | 'board'>('self');

  return (
    <DialogStack
      clickable
      index={index}
      onIndexChange={setIndex}
      {...props}
      onOpenChange={(open) => {
        if (open) {
          return;
        }
        setIndex(0);
        props.onOpenChange?.(open);
      }}
    >
      <DialogStackBody>
        {/* Select Assessment Type */}
        <DialogStackContent offset={20}>
          <DialogStackHeader>
            <DialogStackTitle>Create New Assessment</DialogStackTitle>
            <DialogStackDescription>
              Select the type of the assessment that you would like to create
            </DialogStackDescription>
          </DialogStackHeader>
          <div className="grid h-fit w-full grid-cols-2 gap-4">
            <Button
              className="group h-fit flex-col justify-start gap-2 rounded-2xl p-2 hover:border-ga-blue-300 hover:bg-background dark:hover:border-ga-blue-800"
              onClick={() => {
                setType('self');
                setIndex(1);
              }}
              variant="outline"
            >
              <div className="relative flex w-full items-center justify-center overflow-hidden rounded-md border bg-accent py-8">
                <div className="group-hover:-translate-y-1 relative flex size-18 shrink-0 items-center justify-center rounded-lg border border-ga-blue-300 bg-ga-blue-200 shadow-highlight transition-transform group-hover:scale-105 dark:border-ga-blue-900 dark:bg-ga-blue-950 dark:shadow-sm">
                  <HugeiconsIcon
                    className="size-12 text-ga-blue-600 dark:text-ga-blue-500"
                    icon={UserIcon}
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
              <h2 className="my-1 font-medium text-base">Self assessment</h2>
            </Button>
            <Button
              className="group h-fit flex-col justify-start gap-2 rounded-2xl p-2 hover:border-ga-green-300 hover:bg-background dark:hover:border-ga-green-800"
              onClick={() => {
                setType('board');
                setIndex(1);
              }}
              variant="outline"
            >
              <div className="relative flex w-full items-center justify-center overflow-hidden rounded-md border bg-accent py-8">
                <div className="group-hover:-translate-y-1 relative flex size-18 shrink-0 items-center justify-center rounded-lg border border-ga-green-300 bg-ga-green-200 shadow-highlight transition-transform group-hover:scale-105 dark:border-ga-green-900 dark:bg-ga-green-950 dark:shadow-sm">
                  <HugeiconsIcon
                    className="size-12 text-ga-green-600 dark:text-ga-green-500"
                    icon={UserGroupIcon}
                  />
                  <div className="-right-2 -bottom-2 absolute flex size-6 items-center justify-center rounded-md border border-ga-green-700 bg-ga-green-600 shadow-highlight">
                    <HugeiconsIcon
                      className="size-4 text-white"
                      icon={PlusSignIcon}
                      strokeWidth={2}
                    />
                  </div>
                </div>
                <div className="-bottom-1 absolute h-1 w-full shadow-[0_0_24px_0_var(--color-ga-green-500)] transition-shadow group-hover:shadow-[0_0_64px_8px_var(--color-ga-green-500)] dark:shadow-[0_0_24px_0_var(--color-ga-green-700)] dark:group-hover:shadow-[0_0_64px_8px_var(--color-ga-green-700)]" />
              </div>
              <h2 className="my-1 font-medium text-base">Board assessment</h2>
            </Button>
          </div>
        </DialogStackContent>

        {/* Self Assessment */}
        {type === 'self' ? (
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Create New Self Assessment</DialogStackTitle>
            </DialogStackHeader>
            <CreateSelfAssessmentForm
              formButtonProps={{ onPrevious: () => setIndex(0) }}
              onSuccess={() => {
                setIndex(0);
                props.onOpenChange?.(false);
              }}
            />
          </DialogStackContent>
        ) : (
          // Board Assessment
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Create New Board Assessment</DialogStackTitle>
            </DialogStackHeader>
            <CreateBoardAssessmentForm
              formButtonProps={{ onPrevious: () => setIndex(0) }}
              onSuccess={() => {
                setIndex(0);
                props.onOpenChange?.(false);
              }}
            />
          </DialogStackContent>
        )}
      </DialogStackBody>
    </DialogStack>
  );
}
