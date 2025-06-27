import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon } from '@hugeicons-pro/core-stroke-rounded';
import { DialogClose, DialogContent } from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import AddTeamMemberDialogContent from './dialog-contents/add-team-member-dialog-content';
import CreateBoardAssessmentDialogContent from './dialog-contents/create-board-assessment-dialog-content';
import CreateSelfAssessmentDialogContent from './dialog-contents/create-self-assessment-dialog-content';
import { Button } from './ui/button';
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export default function AddButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="data-[state=open]:-translate-y-7.25 z-51 size-12 rounded-full [anchor-name:--anchor] data-[state=open]:rotate-45 data-[state=open]:scale-150"
          size="icon"
        >
          <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-75 data-[state=open]:zoom-in-75 -translate-x-6 data-[state=open]:slide-in-from-bottom-30 data-[state=closed]:slide-out-to-bottom-30 -translate-y-27.25 absolute top-full left-[anchor(--anchor_left)] z-50 transition-all data-[state=closed]:animate-out data-[state=open]:animate-in"
          data-slot="dialog-content"
        >
          <DialogTitle />
          <div className="relative">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={cn(
                    'peer peer/1 -translate-y-1/2 hover:!bg-white absolute top-[50%] right-[calc(100%+2rem)] bg-black/40 text-lg text-white hover:text-black dark:bg-white/15',
                    'hover:before:-inset-15 before:absolute before:content-[""]'
                  )}
                  variant="ghost"
                >
                  New Self Assessment
                </Button>
              </DialogTrigger>
              <CreateSelfAssessmentDialogContent />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={cn(
                    'peer peer/2 -top-[calc(100%-2rem)] -translate-x-1/2 hover:!bg-white absolute left-[50%] bg-black/40 text-lg text-white hover:text-black dark:bg-white/15',
                    'hover:before:-inset-15 before:absolute before:content-[""]'
                  )}
                  variant="ghost"
                >
                  New Board Assessment
                </Button>
              </DialogTrigger>
              <CreateBoardAssessmentDialogContent />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={cn(
                    'peer peer/3 -translate-y-1/2 hover:!bg-white absolute top-[50%] left-[calc(100%+2rem)] bg-black/40 text-lg text-white hover:text-black dark:bg-white/15',
                    'hover:before:-inset-15 before:absolute before:content-[""]'
                  )}
                  variant="ghost"
                >
                  Add New Team Member
                </Button>
              </DialogTrigger>
              <AddTeamMemberDialogContent />
            </Dialog>
            <DialogClose asChild>
              <div className="peer-hover/1:-rotate-45 group relative size-24 rotate-45 cursor-pointer rounded-full bg-black/40 transition-all peer-hover/3:rotate-135 dark:bg-white/15">
                <div className="absolute inset-0 rounded-full bg-conic from-0% from-transparent via-75% via-transparent to-75% to-white opacity-0 transition-all group-peer-hover:opacity-100" />
              </div>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
