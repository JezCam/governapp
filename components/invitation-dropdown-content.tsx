'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Edit04Icon,
  MailRemove01Icon,
  MailSend01Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import { useState } from 'react';
import ConfirmRemoveInvitationDialog from './dialogs/confirm-remove-invitation-dialog';
import EditInvitationDialog from './dialogs/edit-invitation-dialog';
import { DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

type Invitation = {
  email: string;
  role: string;
  permission: 'admin' | 'member';
};

export default function InvitationDropdownContent({
  invitation,
}: {
  invitation: Invitation;
}) {
  const [editInvitationOpen, setEditInvitationOpen] = useState(false);
  const [confirmRemoveInvitationOpen, setConfirmRemoveTeamMemberOpen] =
    useState(false);

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
      <DropdownMenuContent
        align="start"
        className="w-60 font-medium"
        side="right"
      >
        <DropdownMenuItem className="gap-2 p-2">
          <HugeiconsIcon icon={MailSend01Icon} strokeWidth={2} />
          Resend invitation
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 p-2"
          onSelect={() => setEditInvitationOpen(true)}
        >
          <HugeiconsIcon icon={Edit04Icon} strokeWidth={2} />
          Edit invitation
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:!text-destructive hover:!bg-destructive/10 gap-2 p-2 text-destructive"
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
    </>
  );
}
