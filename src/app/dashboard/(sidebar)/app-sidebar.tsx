'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SearchButton from '@/app/dashboard/(sidebar)/search-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import NavTeam from './nav-team';
import OrganisationSwitcher from './organisation-switcher';

export default function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sidebar className="relative border-sidebar-border" collapsible="icon">
      <SidebarHeader className="gap-0 p-0">
        <Link
          className="flex h-16 flex-row items-center gap-2 overflow-clip border border-transparent px-4"
          href="/dashboard"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-sidebar-border bg-white shadow-sm">
            <Image
              alt="GovernApp Logomark"
              height={20}
              src={'/logomark.svg'}
              width={20}
            />
          </div>
          <span
            className="font-extrabold font-m-plus-rounded-1c text-ga-purple-800 text-xl transition-opacity group-data-[collapsible=icon]:opacity-0 dark:text-white"
            style={{ fontFamily: 'var(--font-m-plus-rounded-1c' }}
          >
            GovernApp
          </span>
          <span className="ml-auto font-mono text-sidebar-primary text-sm tracking-tighter">
            v1.0
          </span>
        </Link>
        <SidebarSeparator className="mx-auto my-0 w-full" />
        <div className="px-4.25 py-4">
          <SearchButton />
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0 border-sidebar-border border-y">
        <ScrollArea className="h-full [&_[data-slot=scroll-area-thumb]]:bg-sidebar-border">
          <div className="w-63.75 transition-[width] duration-200 ease-linear group-data-[collapsible=icon]:w-16.5">
            <NavMain />
            <SidebarSeparator className="mx-auto my-0 w-full" />
            <NavTeam />
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="peer z-10 gap-0 bg-sidebar">
        <OrganisationSwitcher open={open} setOpen={setOpen} />
      </SidebarFooter>
      <button
        className="absolute inset-0 hidden bg-black/30 opacity-0 transition-[display,opacity] transition-discrete peer-has-data-[state=open]:block peer-has-data-[state=open]:opacity-100 peer-has-data-[state=open]:starting:opacity-0"
        onClick={() => setOpen(false)}
        type="button"
      />
      <SidebarRail />
    </Sidebar>
  );
}
