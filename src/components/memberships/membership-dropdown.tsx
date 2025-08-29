'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Edit04Icon,
  UserMinus02Icon,
  ZapIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import { useQuery } from 'convex/react';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';
import type { Membership, User } from '@/types/convex';
import { api } from '../../../convex/_generated/api';
import ConfirmRemoveTeamMemberDialog from '../dialogs/confirm-remove-team-member-dialog';
import EditTeamMemberDialog from '../dialogs/edit-team-member-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function MembershipDropdown({
  membership,
  children,
}: {
  membership: Membership & { user: User };
  children: ReactNode;
}) {
  const currentUser = useQuery(api.services.users.getCurrent);
  const isAdmin = useQuery(api.services.users.isAdminOfActiveOrganisation);

  const [editTeamMemberOpen, setEditTeamMemberOpen] = useState(false);
  const [confirmRemoveTeamMemberOpen, setConfirmRemoveTeamMemberOpen] =
    useState(false);

  const user = membership.user;

  if (currentUser === undefined || isAdmin === undefined) {
    return null; // TODO: Implement loading state
  }

  return (
    <DropdownMenu>
      <EditTeamMemberDialog
        membership={membership}
        onOpenChange={setEditTeamMemberOpen}
        open={editTeamMemberOpen}
      />
      <ConfirmRemoveTeamMemberDialog
        membership={membership}
        onOpenChange={setConfirmRemoveTeamMemberOpen}
        open={confirmRemoveTeamMemberOpen}
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
        {isAdmin && currentUser._id !== user._id && (
          <>
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
            </DropdownMenuItem>{' '}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
