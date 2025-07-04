import { HugeiconsIcon } from '@hugeicons/react';
import {
  Logout02Icon,
  Settings01Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import UserAvatar from './user-avatar';

export default function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="!p-2 h-12 w-[239px] items-center" variant="outline">
          <UserAvatar
            user={{
              name: 'Jeremy Cameron',
              imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
            }}
          />
          <div className="grid h-8 flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Jeremy Cameron</span>
            <span className="truncate font-normal text-xs">
              jeremy@cameron.org.au
            </span>
          </div>
          <ChevronDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <HugeiconsIcon icon={Logout02Icon} strokeWidth={2} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
