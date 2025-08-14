'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Edit04Icon,
  MailRemove01Icon,
  MailSend01Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import { type ReactNode, useState } from 'react';
import { toast } from 'sonner';
import ConfirmRemoveInvitationDialog from '../dialogs/confirm-remove-invitation-dialog';
import EditInvitationDialog from '../dialogs/edit-invitation-dialog';
import { LoadingDropdownMenuItem } from '../loading-dropdown-menu-item';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type Invitation = {
  email: string;
  role: string;
  permission: 'admin' | 'member';
};

export default function InvitationDropdownMenu({
  children,
  invitation,
}: {
  children?: ReactNode;
  invitation: Invitation;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editInvitationOpen, setEditInvitationOpen] = useState(false);
  const [confirmRemoveInvitationOpen, setConfirmRemoveTeamMemberOpen] =
    useState(false);

  const handleResendInvitation = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast.error('Not yet implemented', {
      description: 'This feature is not yet implemented.',
    });
    setOpen(false);
  };

  return (
    <>
      <EditInvitationDialog
        invitation={invitation}
        onOpenChange={setEditInvitationOpen}
        open={editInvitationOpen}
      />
      <ConfirmRemoveInvitationDialog
        invitation={invitation}
        onOpenChange={setConfirmRemoveTeamMemberOpen}
        open={confirmRemoveInvitationOpen}
      />
      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-60 font-medium"
          side="right"
        >
          <LoadingDropdownMenuItem
            className="gap-2 p-2"
            isLoading={isLoading}
            onSelect={handleResendInvitation}
          >
            <HugeiconsIcon icon={MailSend01Icon} strokeWidth={2} />
            Resend invitation
          </LoadingDropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 p-2"
            disabled={isLoading}
            onSelect={() => setEditInvitationOpen(true)}
          >
            <HugeiconsIcon icon={Edit04Icon} strokeWidth={2} />
            Edit invitation
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:!text-destructive hover:!bg-destructive/10 gap-2 p-2 text-destructive"
            disabled={isLoading}
            onSelect={() => setConfirmRemoveTeamMemberOpen(true)}
          >
            <HugeiconsIcon
              className="text-destructive"
              icon={MailRemove01Icon}
              strokeWidth={2}
            />
            Remove invitation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
