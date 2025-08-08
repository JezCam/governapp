import { HugeiconsIcon } from '@hugeicons/react';
import { DashedLineCircleIcon } from '@hugeicons-pro/core-stroke-rounded';
import { cn } from '@/lib/utils';
import type { Organisation } from '@/types/convex';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

export default function OrganisationAvatar({
  organisation,
  className,
}: {
  organisation?: Organisation | null;
  className?: string;
}) {
  if (organisation === undefined) {
    return <Skeleton className={cn('h-6 w-6 rounded-sm border', className)} />;
  }
  if (organisation === null) {
    return (
      <HugeiconsIcon
        className={cn('size-6 text-muted-foreground', className)}
        icon={DashedLineCircleIcon}
      />
    );
  }
  return (
    <Avatar className={cn('size-6 rounded-sm border', className)}>
      <AvatarImage src={organisation.imageUrl} />
      <AvatarFallback className="flex size-full items-center justify-center bg-accent text-foreground">
        {organisation.name[0]}
      </AvatarFallback>
    </Avatar>
  );
}
