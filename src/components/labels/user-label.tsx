import { HugeiconsIcon } from '@hugeicons/react';
import { DashedLineCircleIcon } from '@hugeicons-pro/core-stroke-rounded';
import { cn } from '@/lib/utils';
import type { User } from '@/types/convex';
import UserAvatar from '../avatars/user-avatar';

export default function UserLabel({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  if (user === undefined) {
    return null; // TODO: Add skeleton for user label
  }
  if (user === null) {
    return (
      <HugeiconsIcon
        className={cn('size-6 text-muted-foreground', className)}
        icon={DashedLineCircleIcon}
      />
    );
  }
  return (
    <div
      className={cn('flex items-center gap-1.5 text-sm', className)}
      title={user.name}
    >
      <UserAvatar className="size-6" user={user} />
      <strong>{user.name}</strong>
    </div>
  );
}
