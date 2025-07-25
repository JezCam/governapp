"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { UserGroupIcon, UserIcon } from "@hugeicons-pro/core-stroke-rounded";
import { useState } from "react";
import CreateBoardAssessmentForm from "../forms/create-board-assessment-form";
import CreateSelfAssessmentForm from "../forms/create-self-assessment-form";
import { Button } from "../ui/button";
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackDescription,
  DialogStackHeader,
  type DialogStackProps,
  DialogStackTitle,
} from "../ui/kibo-ui/dialog-stack";

export default function NewAssessmentDialog({ ...props }: DialogStackProps) {
  const [index, setIndex] = useState<number>(0);
  const [type, setType] = useState<"self" | "board">("self");

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
          <div className="grid h-40 w-full grid-cols-2 gap-2">
            <Button
              className="h-full text-base"
              onClick={() => {
                setType("self");
                setIndex(1);
              }}
              variant="outline"
            >
              <HugeiconsIcon
                className="size-5"
                icon={UserIcon}
                strokeWidth={2}
              />
              Self Assessment
            </Button>
            <Button
              className="h-full text-base"
              onClick={() => {
                setType("board");
                setIndex(1);
              }}
              variant="outline"
            >
              <HugeiconsIcon
                className="size-5"
                icon={UserGroupIcon}
                strokeWidth={2}
              />
              Board Assessment
            </Button>
          </div>
        </DialogStackContent>

        {/* Self Assessment */}
        {type === "self" ? (
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
