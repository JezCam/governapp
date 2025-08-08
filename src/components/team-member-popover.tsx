'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Edit04Icon,
  MoreVerticalIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import { useQuery } from 'convex/react';
import { type ReactNode, useState } from 'react';
import type { Membership, User } from '@/types/convex';
import { api } from '../../convex/_generated/api';
import UserAvatar from './avatars/user-avatar';
import EditProfileDialog from './dialogs/edit-profile-dialog';
import TeamMemberPopoverDropdown from './team-member-popover-dropdown';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function TeamMemberPopover({
  membership,
  children,
}: {
  membership: Membership & {
    user: User;
  };
  children: ReactNode;
}) {
  const currentUserId = useQuery(api.services.users.getCurrentId);

  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const user = membership.user;

  return (
    <Popover>
      <EditProfileDialog
        onOpenChange={setEditProfileOpen}
        open={editProfileOpen}
        user={user}
      />
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-80 flex-col gap-2 rounded-xl p-2 pb-4"
        side="right"
      >
        <div className="relative mb-6 h-20 rounded-sm bg-primary">
          <UserAvatar
            className="-bottom-6 absolute left-3 size-16 border-none ring-4 ring-popover"
            user={user}
          />
          <TeamMemberPopoverDropdown user={user}>
            <Button
              className="!bg-black/30 !border-white/30 absolute top-2 right-2 size-8 rounded-full !hover:bg-black/15 text-white hover:text-white"
              size="icon"
              variant="outline"
            >
              <HugeiconsIcon icon={MoreVerticalIcon} />
            </Button>
          </TeamMemberPopoverDropdown>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <div className="flex h-fit flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
              <Badge
                className="h-fit"
                variant={membership.isAdmin ? 'admin' : 'member'}
              />
            </div>
            <span className="text-xs">{user.email}</span>
          </div>
          <Badge variant="outline">{membership.role}</Badge>
          {user._id === currentUserId && (
            <Button
              onClick={() => setEditProfileOpen(true)}
              variant="secondary"
            >
              <HugeiconsIcon icon={Edit04Icon} strokeWidth={2} />
              Edit Profile
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
