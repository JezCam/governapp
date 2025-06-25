import Image from 'next/image';
import Logomark from '@/public/logomark.svg';
import OrganisationSwitcher from './organisation-switcher';
import { Badge } from './ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from './ui/sidebar';

export default function AppSidebar() {
  return (
    <Sidebar className="border-sidebar-border" collapsible="icon">
      <SidebarHeader className="flex h-14 flex-row items-center justify-between gap-11 overflow-clip border-sidebar-border border-b">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md border border-sidebar-border bg-white">
            <Image
              alt="GovernApp Logomark"
              height={20}
              src={Logomark}
              width={20}
            />
          </div>
          <span className="font-extrabold text-ga-purple-800 text-lg dark:text-white">
            GovernApp
          </span>
        </div>
        <Badge className="font-bold text-white tracking-widest">PILOT</Badge>
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter className="flex h-14 border-sidebar-border border-t hover:bg-sidebar-accent has-data-[state=open]:bg-sidebar-accent has-data-[state=open]:text-sidebar-accent-foreground">
        <OrganisationSwitcher />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
