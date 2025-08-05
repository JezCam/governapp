'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Logout02Icon,
  SearchIcon,
  Settings01Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import { useQuery } from 'convex/react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import { SearchMenuContext } from '@/app/dashboard/layout';
import { api } from '../../convex/_generated/api';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Kbd from './ui/kbd';
import { Skeleton } from './ui/skeleton';
import UserAvatar from './user-avatar';

export default function UserDropdown() {
  const { setOpen } = useContext(SearchMenuContext);

  const user = useQuery(api.services.user.getCurrent);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="!p-2 h-12 w-[239px] items-center" variant="outline">
          <UserAvatar className="size-8" user={user} />
          <div className="grid h-8 flex-1 text-left text-sm leading-tight">
            {user ? (
              <>
                <span className="truncate font-medium">{`${user.firstName} ${user.lastName}`}</span>
                <span className="truncate font-normal text-xs">
                  {user.email}
                </span>
              </>
            ) : (
              <>
                <Skeleton className="h-4 w-28 rounded-sm" />
                <Skeleton className="h-3 w-38 rounded-sm" />
              </>
            )}
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
          <DropdownMenuItem asChild onSelect={() => setOpen(true)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={SearchIcon} strokeWidth={2} /> Search Menu
              </div>
              <div className="flex gap-0.5">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex items-center gap-2"
              href={'/dashboard/settings'}
            >
              <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
              Settings
            </Link>
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
