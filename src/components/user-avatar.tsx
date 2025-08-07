import { HugeiconsIcon } from '@hugeicons/react';
import { DashedLineCircleIcon } from '@hugeicons-pro/core-stroke-rounded';
import { cn } from '@/lib/utils';
import type { DataModel } from '../../convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

export default function UserAvatar({
  user,
  className,
}: {
  user?: DataModel['users']['document'] | null;
  className?: string;
}) {
  if (user === undefined) {
    return (
      <Skeleton className={cn('h-6 w-6 rounded-full border', className)} />
    );
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
    <Avatar className={cn('size-6 border', className)}>
      <AvatarImage src={user.imageUrl} />
      <AvatarFallback className="flex size-full items-center justify-center bg-accent text-foreground">
        {user.firstName?.[0]}
      </AvatarFallback>
    </Avatar>
  );
}
