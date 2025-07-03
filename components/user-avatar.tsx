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
  user: User;
  className?: string;
}) {
  return (
    <Avatar className={cn('border', className)}>
      <AvatarImage src={user.imageUrl} />
      <AvatarFallback className="flex size-full items-center justify-center bg-background text-foreground">
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
