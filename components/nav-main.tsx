'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Hexagon01Icon } from '@hugeicons-pro/core-solid-rounded';
import {
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

export const pages = [
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
          {pages.map((page) => (
            <SidebarMenuItem key={page.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  'h-fit rounded-xl border border-transparent font-medium transition-all',
                  pathname === page.url
                    ? 'group-data-[collapsible=icon]:!bg-transparent group-data-[collapsible=icon]:!border-transparent border-sidebar-border bg-white group-data-[collapsible=icon]:rounded-2xl dark:border-border dark:bg-primary'
                    : ''
                )}
                tooltip={page.title}
              >
                <Link href={page.url}>
                  <div
                    className={cn(
                      '!size-8 flex shrink-0 items-center justify-center rounded-sm border border-transparent transition-all [&>svg]:size-4.5 [&>svg]:text-sidebar-primary',
                      pathname === page.url
                        ? 'rounded-sm border-primary bg-sidebar-primary/80 text-white shadow-highlight group-data-[collapsible=icon]:rounded-md dark:border-border-sidebar dark:bg-white dark:text-sidebar-accent [&>svg]:text-white dark:[&>svg]:text-sidebar-accent'
                        : ''
                    )}
                  >
                    {page.icon && (
                      <HugeiconsIcon icon={page.icon} strokeWidth={2} />
                    )}
                  </div>
                  <span>{page.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
