'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Hexagon01Icon,
  Home09Icon,
  Settings01Icon,
  TaskDone02Icon,
  UserGroupIcon,
  ZapIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const items = [
  { title: 'Home', url: '/dashboard', icon: Home09Icon },
  {
    title: 'Organisation',
    url: '/dashboard/organisation',
    icon: UserGroupIcon,
  },
  { title: 'Frameworks', url: '/dashboard/frameworks', icon: Hexagon01Icon },
  { title: 'Assessments', url: '/dashboard/assessments', icon: TaskDone02Icon },
  { title: 'Actions', url: '/dashboard/actions', icon: ZapIcon },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings01Icon },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-0">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  'h-fit rounded-xl border border-transparent font-medium transition-all',
                  pathname === item.url
                    ? 'border-sidebar-border bg-background group-data-[collapsible=icon]:rounded-2xl group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:bg-transparent'
                    : ''
                )}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <div
                    className={cn(
                      '!size-8 flex shrink-0 items-center justify-center rounded-sm border border-transparent transition-all [&>svg]:size-4.5',
                      pathname === item.url
                        ? 'rounded-sm border-primary bg-primary/80 text-white shadow-highlight group-data-[collapsible=icon]:rounded-md'
                        : ''
                    )}
                  >
                    {item.icon && <HugeiconsIcon icon={item.icon} />}
                  </div>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
