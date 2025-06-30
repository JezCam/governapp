'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlusSignIcon,
  TaskDone02Icon,
  UserAdd01Icon,
  UserGroup03Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import { DialogClose, DialogContent } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import AddOrganisationDialog from './dialogs/add-organisation-dialog';
import { Button } from './ui/button';
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export default function AddButton() {
  const [open, setOpen] = useState(false);
  const [addOrganisationOpen, setAddOrganisationOpen] = useState(false);
  //   const [createNewAssessmentOpen, setCreateNewAssessmentOpen] = useState(false);
  //   const [addNewTeamMemberOpen, setAddNewTeamMemberOpen] = useState(false);

  return (
    <div className="z-50">
      <AddOrganisationDialog
        onClose={() => setAddOrganisationOpen(false)}
        onOpenChange={setAddOrganisationOpen}
        open={addOrganisationOpen}
      />
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button
            className="data-[state=open]:-translate-y-7.25 size-12 rounded-full [anchor-name:--anchor] data-[state=open]:rotate-45 data-[state=open]:scale-150"
            size="icon"
          >
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="z-49" />
          <DialogContent
            className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-75 data-[state=open]:zoom-in-75 -translate-x-6 data-[state=open]:slide-in-from-bottom-30 data-[state=closed]:slide-out-to-bottom-30 -translate-y-27.25 absolute top-full left-[anchor(--anchor_left)] z-49 transition-all data-[state=closed]:animate-out data-[state=open]:animate-in"
            data-slot="dialog-content"
          >
            <DialogTitle />
            <div className="relative">
              <Button
                className={cn(
                  'peer peer/1 -translate-y-1/2 hover:!bg-white absolute top-[50%] right-[calc(100%+2rem)] bg-black/40 text-lg text-white hover:text-black dark:bg-white/15',
                  'hover:before:-inset-15 before:absolute before:content-[""]'
                )}
                onClick={() => {
                  setAddOrganisationOpen(true);
                  setOpen(false);
                }}
                variant="ghost"
              >
                <HugeiconsIcon
                  className="size-5"
                  icon={UserGroup03Icon}
                  strokeWidth={2}
                />
                Add New Organisation
              </Button>
              <Button
                className={cn(
                  'peer peer/2 -top-[calc(100%-2rem)] -translate-x-1/2 hover:!bg-white absolute left-[50%] bg-black/40 text-lg text-white hover:text-black dark:bg-white/15',
                  'hover:before:-inset-15 before:absolute before:content-[""]'
                )}
                variant="ghost"
              >
                <HugeiconsIcon
                  className="size-5"
                  icon={TaskDone02Icon}
                  strokeWidth={2}
                />
                Create New Assessment
              </Button>
              <Button
                className={cn(
                  'peer peer/3 -translate-y-1/2 hover:!bg-white absolute top-[50%] left-[calc(100%+2rem)] bg-black/40 text-lg text-white hover:text-black dark:bg-white/15',
                  'hover:before:-inset-15 before:absolute before:content-[""]'
                )}
                variant="ghost"
              >
                <HugeiconsIcon
                  className="size-5"
                  icon={UserAdd01Icon}
                  strokeWidth={2}
                />
                Add New Team Member
              </Button>
              <DialogClose asChild>
                <div className="peer-hover/1:-rotate-45 group relative size-24 rotate-45 cursor-pointer rounded-full bg-black/40 transition-all peer-hover/3:rotate-135 dark:bg-white/15">
                  <div className="absolute inset-0 rounded-full bg-conic from-0% from-transparent via-75% via-transparent to-75% to-white opacity-0 transition-all group-peer-hover:opacity-100" />
                </div>
              </DialogClose>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
