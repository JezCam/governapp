'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Edit04Icon,
  MoreVerticalIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import { type ReactNode, useState } from 'react';
import type { TeamMember } from '@/dummy-data/team';
import EditProfileDialog from './dialogs/edit-profile-dialog';
import TeamMemberPopoverDropdown from './team-member-popover-dropdown';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import UserAvatar from './user-avatar';

export default function TeamMemberPopover({
  member,
  children,
}: {
  member: TeamMember;
  children: ReactNode;
}) {
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  return (
    <Popover>
      <EditProfileDialog
        onOpenChange={setEditProfileOpen}
        open={editProfileOpen}
        user={member}
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
            user={member}
          />
          <TeamMemberPopoverDropdown user={member}>
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
              <span className="font-medium">{member.name}</span>
              <Badge className="h-fit" variant={member.permission} />
            </div>
            <span className="text-xs">{member.email}</span>
          </div>
          <Badge variant="outline">{member.role}</Badge>
          {member.userId === '0' && (
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
