'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Logout02Icon,
  PaintBoardIcon,
  PlusSignSquareIcon,
  SearchIcon,
  Settings01Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import { useQuery } from 'convex/react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import UserAvatar from '@/components/avatars/user-avatar';
import AddOrganisationDialog from '@/components/dialogs/add-organisation-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Kbd from '@/components/ui/kbd';
import { ThemeSwitcher } from '@/components/ui/kibo-ui/theme-switcher';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '../../../../convex/_generated/api';
import { SearchMenuContext } from '../context';

export default function UserDropdown() {
  const [addOrganisationOpen, setAddOrganisationOpen] = useState(false);
  const { signOut } = useAuthActions();
  const { setOpen } = useContext(SearchMenuContext);

  const user = useQuery(api.services.users.getCurrent);

  return (
    <div className="flex h-full items-center border-l px-2">
      <AddOrganisationDialog
        onOpenChange={setAddOrganisationOpen}
        open={addOrganisationOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="!p-2 h-12 w-[256px] items-center" variant="ghost">
            <UserAvatar className="size-8" user={user} />
            <div className="grid h-8 flex-1 text-left text-sm leading-tight">
              {user ? (
                <>
                  <span className="truncate font-medium">{`${user.firstName} ${user.lastName}`}</span>
                  <span className="truncate font-normal text-muted-foreground text-xs">
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
        >
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setAddOrganisationOpen(true)}>
              <HugeiconsIcon icon={PlusSignSquareIcon} strokeWidth={2} />
              Add organisation
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
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="group/kbd justify-between"
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
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link className="flex items-center gap-2" href={'/home'}>
                <div className="flex size-4 items-center justify-center">
                  <Image
                    alt="GovernApp logomark"
                    height={14}
                    src="/logomark.svg"
                    width={14}
                  />
                </div>
                GovernApp Website
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={signOut}>
              <HugeiconsIcon icon={Logout02Icon} strokeWidth={2} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
