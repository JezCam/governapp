import { HugeiconsIcon } from '@hugeicons/react';
import { DashedLineCircleIcon } from '@hugeicons-pro/core-stroke-rounded';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type User = {
  name: string;
  imageUrl?: string;
};

export default function UserAvatar({
  user,
  className,
}: {
  user?: User;
  className?: string;
}) {
  if (!user) {
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
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
