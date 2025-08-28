'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Building03Icon,
  PlusSignIcon,
  TaskAdd02Icon,
  UserAdd01Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import { DialogClose, DialogContent } from '@radix-ui/react-dialog';
import { useState } from 'react';
import AddOrganisationDialog from '@/components/dialogs/add-organisation-dialog';
import AddTeamMemberDialog from '@/components/dialogs/add-team-member-dialog';
import CreateSelfAssessmentDialog from '@/components/dialogs/create-self-assessment-dialog';
import NewAssessmentDialog from '@/components/dialogs/new-assessment-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useUserContext } from '../context';

export default function AddButton() {
  const { isAdminOfActiveOrganisation } = useUserContext();

  const [open, setOpen] = useState(false);
  const [addOrganisationOpen, setAddOrganisationOpen] = useState(false);
  const [createSelfAssessmentOpen, setCreateSelfAssessmentOpen] =
    useState(false);
  const [newAssessmentOpen, setNewAssessmentOpen] = useState(false);
  const [addTeamMemberOpen, setAddTeamMemberOpen] = useState(false);

  return (
    <div className="z-50">
      <AddOrganisationDialog
        onOpenChange={setAddOrganisationOpen}
        open={addOrganisationOpen}
      />
      {/* For non admin user */}
      <CreateSelfAssessmentDialog
        onOpenChange={setCreateSelfAssessmentOpen}
        open={createSelfAssessmentOpen}
      />
      <NewAssessmentDialog
        onOpenChange={setNewAssessmentOpen}
        open={newAssessmentOpen}
      />
      <AddTeamMemberDialog
        onOpenChange={setAddTeamMemberOpen}
        open={addTeamMemberOpen}
      />
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button
            className="data-[state=open]:-translate-y-7.25 size-12 rounded-full [anchor-name:--anchor] data-[state=open]:scale-150 [&>svg]:transition-transform data-[state=open]:[&>svg]:rotate-45"
            size="icon"
          >
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="z-49" />
          <DialogContent
            className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-75 data-[state=open]:zoom-in-75 -translate-x-6 data-[state=open]:slide-in-from-bottom-30 data-[state=closed]:slide-out-to-bottom-30 -translate-y-27.25 absolute top-full left-[anchor(--anchor_left)] z-49 transition-[opacity,_transform] data-[state=closed]:animate-out data-[state=open]:animate-in"
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
                  icon={Building03Icon}
                  strokeWidth={2}
                />
                Add New Organisation
              </Button>
              <Button
                className={cn(
                  'peer peer/2 -top-[calc(100%-2rem)] -translate-x-1/2 hover:!bg-white absolute left-[50%] bg-black/40 text-lg text-white hover:text-black dark:bg-white/15',
                  'hover:before:-inset-15 before:absolute before:content-[""]'
                )}
                onClick={() => {
                  if (isAdminOfActiveOrganisation) {
                    setNewAssessmentOpen(true);
                  } else {
                    setCreateSelfAssessmentOpen(true);
                  }
                  setOpen(false);
                }}
                variant="ghost"
              >
                <HugeiconsIcon
                  className="size-5"
                  icon={TaskAdd02Icon}
                  strokeWidth={2}
                />
                Create New Assessment
              </Button>
              <Button
                className={cn(
                  'peer peer/3 -translate-y-1/2 hover:!bg-white absolute top-[50%] left-[calc(100%+2rem)] bg-black/40 text-lg text-white hover:text-black dark:bg-white/15',
                  'hover:before:-inset-15 before:absolute before:content-[""]'
                )}
                onClick={() => {
                  setAddTeamMemberOpen(true);
                  setOpen(false);
                }}
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
                <div className="peer-hover/1:-rotate-45 group relative size-24 rotate-45 cursor-pointer rounded-full bg-black/40 transition-transform peer-hover/3:rotate-135 dark:bg-white/15">
                  <div className="absolute inset-0 rounded-full bg-conic from-0% from-transparent via-75% via-transparent to-75% to-white opacity-0 transition-opacity group-peer-hover:opacity-100" />
                </div>
              </DialogClose>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
