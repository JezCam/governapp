import { HugeiconsIcon, type HugeiconsIconProps } from '@hugeicons/react';
import {
  Comment01Icon,
  Notification02Icon,
  TaskDone02Icon,
  ZapIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import type { ReactNode } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

// import UserAvatar from './user-avatar';

type User = {
  imageUrl?: string;
  name: string;
};

type NotificationType = 'assessment' | 'comment' | 'action';

type Notification = {
  id: string;
  type: NotificationType;
  user: User;
  message: ReactNode;
  date: string;
};

const notificationTypeIcons: Record<
  NotificationType,
  HugeiconsIconProps['icon']
> = {
  assessment: TaskDone02Icon,
  comment: Comment01Icon,
  action: ZapIcon,
};

const notifications: Notification[] = [
  {
    id: '1',
    type: 'assessment',
    user: {
      name: 'Jeremy Cameron',
      imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
    },
    message: (
      <span>
        Assessment completed by <strong>Jeremy Cameron</strong>
      </span>
    ),
    date: 'today',
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'Jeremy Cameron',
      imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
    },
    message: (
      <span>
        <strong>Jeremy Cameron</strong> commented on your assessment
      </span>
    ),
    date: 'yesterday',
  },
  {
    id: '3',
    type: 'action',
    user: {
      name: 'Jeremy Cameron',
      imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
    },
    message: (
      <span>
        <strong>Jeremy Cameron</strong> assigned you a new task
      </span>
    ),
    date: '3d',
  },
];

export default function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative" size="icon" variant="outline">
          <div className="-top-1.5 -right-1.5 absolute flex size-4 items-center justify-center rounded-full bg-red-500 font-bold text-white text-xs">
            3
          </div>
          <HugeiconsIcon icon={Notification02Icon} strokeWidth={2} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-100">
        <DropdownMenuGroup className="flex flex-row items-center justify-between p-1">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <Button size="sm" variant="outline">
            Clear All
          </Button>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.map((notification) => (
            <DropdownMenuItem
              className="flex min-h-16 items-start gap-4 p-2"
              key={notification.id}
            >
              <div className="relative">
                {/* <UserAvatar className="size-10" user={notification.user} /> */}
                <div className="-bottom-2 -right-2 absolute flex size-6 items-center justify-center rounded-full border bg-background shadow-xs">
                  <HugeiconsIcon
                    className="size-3"
                    icon={notificationTypeIcons[notification.type]}
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="w-full text-sm">{notification.message}</span>
                <span className="self-start text-muted-foreground text-xs">
                  {notification.date}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
