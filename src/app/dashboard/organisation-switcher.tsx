'use client';

import { AudioWaveform, Command, GalleryVerticalEnd, Plus } from 'lucide-react';
import { useState } from 'react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import AddOrganisationDialog from '../../components/dialogs/add-organisation-dialog';
import UnfoldClose from '../../components/unfold-close';

const organisations = [
  {
    id: 1,
    name: 'Acme Corp.',
    logo: AudioWaveform,
    plan: 'Startup',
  },
  {
    id: 2,
    name: 'Evil Corp.',
    logo: Command,
    plan: 'Free',
  },
];

export default function OrganisationSwitcher() {
  const [open, setOpen] = useState(false);
  const [addOrganisationOpen, setAddOrganisationOpen] = useState(false);

  return (
    <>
      <AddOrganisationDialog
        onOpenChange={setAddOrganisationOpen}
        open={addOrganisationOpen}
      />
      <SidebarMenu
        className={cn(
          'z-10 flex h-12 flex-col justify-end gap-2 overflow-hidden transition-[height]',
          open ? 'h-[calc-size(auto,_size)]' : ''
        )}
      >
        <SidebarMenuItem className="h-fit w-full border-sidebar-border border-b pb-2">
          <SidebarMenuButton
            className="group h-12 rounded-md border border-transparent font-medium transition-all data-[state=open]:bg-transparent data-[state=open]:text-white group-data-[collapsible=icon]:rounded-2xl"
            size="lg"
          >
            <div className="bg flex size-8 items-center justify-center rounded-sm border border-primary shadow-sm">
              <Plus className="size-4 text-primary" strokeWidth={2} />
            </div>
            Add Organisation
          </SidebarMenuButton>
          {organisations.map((organisation) => (
            <SidebarMenuButton
              className="group h-12 rounded-md border border-transparent transition-all data-[state=open]:bg-transparent data-[state=open]:text-white group-data-[collapsible=icon]:rounded-2xl"
              key={organisation.id}
              size="lg"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-sm border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground shadow-sm transition-all group-data-[collapsible=icon]:rounded-md">
                <organisation.logo className="size-4 shrink-0" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {organisation.name}
                </span>
              </div>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>
        <SidebarMenuItem className="flex items-center justify-between">
          <SidebarMenuButton
            className="group h-12 rounded-md border border-transparent transition-all data-[state=open]:bg-transparent data-[state=open]:text-white group-data-[collapsible=icon]:rounded-2xl"
            onClick={() => setOpen((prev) => !prev)}
            size="lg"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-sm border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground shadow-sm transition-all group-data-[collapsible=icon]:rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Acme Incorporated</span>
            </div>
            <UnfoldClose className="ml-auto" open={open} />
          </SidebarMenuButton>
          {/* <DropdownMenuContent
              align="start"
              className="w-(--radix-dropdown-menu-trigger-width) border-none bg-transparent p-0 shadow-none"
              side={isMobile ? 'bottom' : 'top'}
              sideOffset={4}
            >
              <DropdownMenuItem
                className="hover:!bg-black/10 dark:hover:!bg-white/10 hover:!text-white gap-2 rounded-xl p-2.25 font-medium text-white"
                onClick={() => setAddOrganisationOpen(true)}
              >
                <div className="bg flex size-8 items-center justify-center rounded-sm border border-white bg-black/20 shadow-sm">
                  <Plus className="size-4 text-white" />
                </div>
                Add Organisation
              </DropdownMenuItem>
              <DropdownMenuSeparator className="mx-2 bg-white/20" />
              {organisations.map((organisation) => (
                <DropdownMenuItem
                  className="hover:!bg-black/10 dark:hover:!bg-white/10 hover:!text-white gap-2 rounded-xl p-2.25 font-medium text-white last:mb-3"
                  key={organisation.name}
                >
                  <div className="flex size-8 items-center justify-center rounded-sm border bg-white shadow-sm">
                    <organisation.logo className="size-4 shrink-0" />
                  </div>
                  {organisation.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent> */}
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
