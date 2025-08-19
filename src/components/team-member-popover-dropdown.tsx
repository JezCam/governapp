'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Edit04Icon,
  UserMinus02Icon,
  ZapIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';
import type { Membership, User } from '@/types/convex';
import ConfirmRemoveTeamMemberDialog from './dialogs/confirm-remove-team-member-dialog';
import EditTeamMemberDialog from './dialogs/edit-team-member-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function TeamMemberPopoverDropdown({
  membership,
  children,
}: {
  membership: Membership & { user: User };
  children: ReactNode;
}) {
  const [editTeamMemberOpen, setEditTeamMemberOpen] = useState(false);
  const [confirmRemoveTeamMemberOpen, setConfirmRemoveTeamMemberOpen] =
    useState(false);

  const user = membership.user;

  return (
    <DropdownMenu>
      <EditTeamMemberDialog
        membership={membership}
        onOpenChange={setEditTeamMemberOpen}
        open={editTeamMemberOpen}
      />
      <ConfirmRemoveTeamMemberDialog
        onOpenChange={setConfirmRemoveTeamMemberOpen}
        open={confirmRemoveTeamMemberOpen}
        user={user}
      />
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-60 font-medium"
        side="right"
      >
        <DropdownMenuItem asChild className="gap-2 p-2">
          <Link href={`/dashboard/actions?assignee=${user._id}`}>
            <HugeiconsIcon icon={ZapIcon} strokeWidth={2} />
            View assigned actions
          </Link>
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
    </DropdownMenu>
  );
}
