import { cn } from '@/lib/utils';
import UserAvatar from '../user-avatar';

type User = {
  name: string;
  imageUrl?: string;
};

export default function UserLabel({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  return (
    <div
      className={cn('flex items-center gap-2 text-sm', className)}
      title={user.name}
    >
      <UserAvatar className="size-6" user={user} />
      <span className="font-medium">{user.name}</span>
    </div>
  );
}
