import { HugeiconsIcon } from '@hugeicons/react';
import { DashedLineCircleIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { TeamMember } from '@/dummy-data/team';
// import UserAvatar from '../user-avatar';
import { AvatarStack } from './kibo-ui/avatar-stack';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

export default function UserAvatarStack({
  users,
  size = 32,
}: {
  users: TeamMember[];
  size?: number;
}) {
  if (!users.length) {
    return (
      <HugeiconsIcon
        className={'text-muted-foreground'}
        icon={DashedLineCircleIcon}
        style={{
          width: size,
          height: size,
        }}
      />
    );
  }
  return (
    <TooltipProvider>
      <AvatarStack size={size}>
        {users.map((user) => (
          <Tooltip key={user.userId}>
            <TooltipTrigger className="size-full">
              {/* <UserAvatar user={user} /> */}
            </TooltipTrigger>
            <TooltipContent>{user.name}</TooltipContent>
          </Tooltip>
        ))}
      </AvatarStack>
    </TooltipProvider>
  );
}
