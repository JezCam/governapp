'use client';

import { useState } from 'react';
import CreateBoardAssessmentForm from '../forms/create-board-assessment-form';
import CreateSelfAssessmentForm from '../forms/create-self-assessment-form';
import { Button } from '../ui/button';
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackHeader,
  DialogStackOverlay,
  type DialogStackProps,
  DialogStackTitle,
} from '../ui/kibo-ui/dialog-stack';

export default function NewAssessmentDialog({
  overlay = true,
  ...props
}: DialogStackProps & {
  overlay?: boolean;
}) {
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
      {overlay && <DialogStackOverlay />}

      <DialogStackBody>
        {/* Select Assessment Type */}
        <DialogStackContent offset={20}>
          <DialogStackHeader>
            <DialogStackTitle>Select the Assessment Type</DialogStackTitle>
          </DialogStackHeader>
          <div className="grid h-40 w-full grid-cols-2 gap-2">
            <Button
              className="h-full"
              onClick={() => {
                setType('self');
                setIndex(1);
              }}
              variant="outline"
            >
              Self Assessment
            </Button>
            <Button
              className="h-full"
              onClick={() => {
                setType('board');
                setIndex(1);
              }}
              variant="outline"
            >
              Board Assessment
            </Button>
          </div>
        </DialogStackContent>

        {/* Self Assessment */}
        {type === 'self' ? (
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Create a New Self Assessment</DialogStackTitle>
            </DialogStackHeader>
            <CreateSelfAssessmentForm
              onPrevious={() => setIndex(0)}
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
              <DialogStackTitle>Create a New Board Assessment</DialogStackTitle>
            </DialogStackHeader>
            <CreateBoardAssessmentForm
              onPrevious={() => setIndex(0)}
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
