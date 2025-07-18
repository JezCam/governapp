'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Edit04Icon,
  UserMinus02Icon,
  ZapIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import { useState } from 'react';
import ConfirmRemoveTeamMemberDialog from './dialogs/confirm-remove-team-member-dialog';
import EditTeamMemberDialog from './dialogs/edit-team-member-dialog';
import { DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

type User = {
  name: string;
  imageUrl?: string;
};

export default function TeamMemberDropdownContent({ user }: { user: User }) {
  const [editTeamMemberOpen, setEditTeamMemberOpen] = useState(false);
  const [confirmRemoveTeamMemberOpen, setConfirmRemoveTeamMemberOpen] =
    useState(false);

  return (
    <>
      <EditTeamMemberDialog
        onOpenChange={setEditTeamMemberOpen}
        open={editTeamMemberOpen}
        user={user}
      />
      <ConfirmRemoveTeamMemberDialog
        onOpenChange={setConfirmRemoveTeamMemberOpen}
        open={confirmRemoveTeamMemberOpen}
        user={user}
      />
      <DropdownMenuContent
        align="start"
        className="w-60 font-medium"
        side="right"
      >
        <DropdownMenuItem className="gap-2 p-2">
          <HugeiconsIcon icon={ZapIcon} strokeWidth={2} />
          View assigned actions
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 p-2"
          onSelect={() => setEditTeamMemberOpen(true)}
        >
          <HugeiconsIcon icon={Edit04Icon} strokeWidth={2} />
          Edit member details
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:!text-destructive hover:!bg-destructive/10 gap-2 p-2 text-destructive"
          onSelect={() => setConfirmRemoveTeamMemberOpen(true)}
        >
          <HugeiconsIcon
            className="text-destructive"
            icon={UserMinus02Icon}
            strokeWidth={2}
          />
          Remove from team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
}
