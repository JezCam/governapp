import { HugeiconsIcon } from '@hugeicons/react';
import { Notification02Icon } from '@hugeicons-pro/core-stroke-rounded';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative" size="icon" variant="outline">
          <div className="-top-1.5 -right-1.5 absolute flex size-4 items-center justify-center rounded-full bg-red-500 font-bold text-white text-xs">
            2
          </div>
          <HugeiconsIcon icon={Notification02Icon} strokeWidth={2} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">Notifications</DropdownMenuContent>
    </DropdownMenu>
  );
}
