'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { SearchIcon } from '@hugeicons-pro/core-stroke-rounded';
import { CornerDownLeft, MoonIcon, SunIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useContext } from 'react';
import { SearchMenuContext } from '@/app/dashboard/layout';
import { pages } from '../app/dashboard/nav-main';
import { Button } from './ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import Kbd from './ui/kbd';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

export default function SearchButton() {
  const { open, setOpen } = useContext(SearchMenuContext);

  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip="Search">
          <Button
            className="group/search after:-inset-4 w-full max-w-sm justify-between gap-21 border border-primary/15 bg-sidebar-accent px-1.5 text-ga-purple-600 shadow-none after:absolute after:content-[''] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:text-ga-purple-300 dark:hover:text-ga-purple-100"
            onClick={() => setOpen(true)}
            variant="secondary"
          >
            <div className="flex items-center gap-3.75">
              <HugeiconsIcon
                className="size-4.5"
                icon={SearchIcon}
                strokeWidth={2}
              />
              Search
            </div>
            <div className="flex gap-0.5">
              <Kbd className="border-primary/30 group-hover/search:text-foreground">
                ⌘
              </Kbd>
              <Kbd className="border-primary/30 group-hover/search:text-foreground">
                K
              </Kbd>
            </div>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <CommandDialog
        className="rounded-xl bg-popover p-2 pb-11"
        onOpenChange={setOpen}
        open={open}
        showCloseButton={false}
      >
        <CommandInput placeholder="Search GovernApp..." />
        <CommandList className="outline-hidden [scrollbar-width:none]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.title}
                onSelect={() => {
                  router.push(page.url);
                  setOpen(false);
                }}
              >
                <HugeiconsIcon icon={page.icon} strokeWidth={2} />
                <span>{page.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              key={'theme'}
              onSelect={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }
            >
              <MoonIcon aria-hidden="true" className="dark:hidden" size={16} />
              <SunIcon
                aria-hidden="true"
                className="hidden dark:block"
                size={16}
              />
              <span>Change Theme</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <div className="absolute inset-x-0 bottom-0 z-20 flex h-10 items-center justify-between gap-2 rounded-b-xl border-t bg-secondary px-4 font-medium text-muted-foreground text-xs">
          <div className="flex items-center gap-1.5">
            <Kbd>
              <CornerDownLeft />
            </Kbd>
            go to page
          </div>
          <div className="flex items-center gap-1.5">
            <Kbd className="">ESC</Kbd>
            close
          </div>
        </div>
      </CommandDialog>
    </SidebarMenu>
  );
}
