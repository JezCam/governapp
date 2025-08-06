'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Logout02Icon,
  PaintBoardIcon,
  PlusSignCircleIcon,
  SearchIcon,
  Settings01Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import { useQuery } from 'convex/react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { SearchMenuContext } from '@/app/dashboard/layout';
import { api } from '../../convex/_generated/api';
import AddOrganisationDialog from './dialogs/add-organisation-dialog';
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
import { ThemeSwitcher } from './ui/kibo-ui/theme-switcher';
import { Skeleton } from './ui/skeleton';
import UserAvatar from './user-avatar';

export default function UserDropdown() {
  const [addOrganisationOpen, setAddOrganisationOpen] = useState(false);
  const { signOut } = useAuthActions();
  const { setOpen } = useContext(SearchMenuContext);

  const user = useQuery(api.services.user.getCurrent);

  return (
    <div>
      <AddOrganisationDialog
        onOpenChange={setAddOrganisationOpen}
        open={addOrganisationOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="!p-2 h-12 w-[256px] items-center"
            variant="outline"
          >
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
                  <Skeleton className="mb-1 h-4 w-28 rounded-sm" />
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
            <DropdownMenuItem onSelect={() => setAddOrganisationOpen(true)}>
              <HugeiconsIcon icon={PlusSignCircleIcon} strokeWidth={2} />
              Add organisation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="justify-between"
              onSelect={() => setOpen(true)}
            >
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={SearchIcon} strokeWidth={2} /> Search
              </div>
              <div className="flex gap-0.5">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </div>
            </DropdownMenuItem>
            <div className="flex items-center justify-between px-2 py-1.5 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={PaintBoardIcon}
                  size={16}
                  strokeWidth={2}
                />
                Theme
              </div>
              <ThemeSwitcher small />
            </div>
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
          <DropdownMenuItem onSelect={signOut}>
            <HugeiconsIcon icon={Logout02Icon} strokeWidth={2} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
