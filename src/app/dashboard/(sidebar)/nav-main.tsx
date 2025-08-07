'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Hexagon01Icon } from '@hugeicons-pro/core-solid-rounded';
import {
  Building03Icon,
  File01Icon,
  Home09Icon,
  Settings01Icon,
  TaskDone02Icon,
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
    icon: Building03Icon,
  },
  { title: 'Frameworks', url: '/dashboard/frameworks', icon: Hexagon01Icon },
  { title: 'Assessments', url: '/dashboard/assessments', icon: TaskDone02Icon },
  { title: 'Reports', url: '/dashboard/reports', icon: File01Icon },
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
                  'h-fit rounded-xl border border-transparent font-medium transition-all duration-200',
                  pathname === page.url
                    ? 'group-data-[collapsible=icon]:!border-transparent dark:!bg-ga-purple-800 border-sidebar-border bg-white hover:bg-white group-data-[collapsible=icon]:rounded-2xl group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:hover:bg-sidebar-accent dark:border-border'
                    : ''
                )}
                tooltip={page.title}
              >
                <Link href={page.url}>
                  <div
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-sm border border-transparent transition-all [&>svg]:size-4.5 [&>svg]:text-sidebar-primary',
                      pathname === page.url
                        ? 'rounded-sm border-ga-purple-800 bg-sidebar-primary text-white shadow-highlight group-data-[collapsible=icon]:rounded-md dark:border-border-sidebar dark:bg-ga-purple-500 dark:text-sidebar-accent [&>svg]:text-white'
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
