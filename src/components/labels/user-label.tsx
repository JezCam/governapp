'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { DashedLineCircleIcon } from '@hugeicons-pro/core-stroke-rounded';
import { useQuery } from 'convex/react';
import { cn } from '@/lib/utils';
import type { User } from '@/types/convex';
import { api } from '../../../convex/_generated/api';
import UserAvatar from '../avatars/user-avatar';
import { Badge } from '../ui/badge';

export default function UserLabel({
  user,
  className,
}: {
  user?: User | null;
  className?: string;
}) {
  const currentUser = useQuery(api.services.users.getCurrent);

  if (user === undefined || currentUser === undefined) {
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
    <div className={cn('flex items-center gap-1.5 text-sm', className)}>
      <UserAvatar className="size-6" user={user} />
      <strong>{`${user.firstName} ${user.lastName}`}</strong>
      {currentUser._id === user._id && <Badge variant="secondary">You</Badge>}
    </div>
  );
}
