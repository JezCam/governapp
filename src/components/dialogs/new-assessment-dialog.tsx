'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { UserGroupIcon, UserIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { DialogProps } from '@radix-ui/react-dialog';
import CreateBoardAssessmentForm from '../forms/create-board-assessment-form';
import CreateSelfAssessmentForm from '../forms/create-self-assessment-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export default function NewAssessmentDialog({ ...props }: DialogProps) {
  const handleClose = () => {
    props.onOpenChange?.(false);
  };

  return (
    <Dialog
      {...props}
      onOpenChange={(open) => {
        if (open) {
          return;
        }
        props.onOpenChange?.(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Assessment</DialogTitle>
          <DialogDescription>
            Select the type of the assessment that you would like to create
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="self">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="self">
              <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
              Self
            </TabsTrigger>
            <TabsTrigger value="board">
              <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
              Board
            </TabsTrigger>
          </TabsList>
          <TabsContent value="self">
            <CreateSelfAssessmentForm
              formButtonProps={{ onPrevious: handleClose }}
              onSuccess={handleClose}
            />
          </TabsContent>
          <TabsContent value="board">
            <CreateBoardAssessmentForm
              formButtonProps={{ onPrevious: handleClose }}
              onSuccess={handleClose}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
