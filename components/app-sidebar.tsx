import Image from 'next/image';
import Logomark from '@/public/logomark.svg';
import { NavMain } from './nav-main';
import NavTeam from './nav-team';
import OrganisationSwitcher from './organisation-switcher';
import SearchButton from './search-button';
import { Badge } from './ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from './ui/sidebar';

export default function AppSidebar() {
  return (
    <Sidebar className="border-sidebar-border" collapsible="icon">
      <SidebarHeader className="flex h-16 flex-row items-center justify-between gap-6.25 overflow-clip px-4">
        <div className="flex items-center gap-2 border border-transparent">
          <div className="flex size-8 items-center justify-center rounded-md border border-sidebar-border bg-white shadow-sm">
            <Image
              alt="GovernApp Logomark"
              height={20}
              src={Logomark}
              width={20}
            />
          </div>
          <span className="font-extrabold text-ga-purple-800 text-lg transition-all group-data-[collapsible=icon]:translate-x-3 group-data-[collapsible=icon]:opacity-0 dark:text-white">
            GovernApp
          </span>
        </div>
        <Badge className="font-bold text-white tracking-widest">PILOT</Badge>
      </SidebarHeader>
      <SidebarContent className="gap-0 overflow-clip border-sidebar-border border-y">
        <div className="p-4">
          <SearchButton />
        </div>
        <SidebarSeparator className="mx-auto my-0 w-full" />
        <NavMain />
        <SidebarSeparator className="mx-auto my-0 w-full" />
        <NavTeam />
      </SidebarContent>
      <SidebarFooter className="flex h-16">
        <OrganisationSwitcher />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
