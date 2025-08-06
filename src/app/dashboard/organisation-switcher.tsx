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

export default function OrganisationSwitcher({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
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
        data-state={open ? 'open' : 'closed'}
      >
        <SidebarMenuItem className="h-fit w-full">
          <SidebarMenuButton
            className="group h-12 whitespace-nowrap rounded-md border border-transparent font-medium transition-all data-[state=open]:bg-transparent group-data-[collapsible=icon]:rounded-2xl"
            onClick={() => {
              setOpen(!open);
              setAddOrganisationOpen(true);
            }}
            size="lg"
          >
            <div className="bg flex size-8 shrink-0 items-center justify-center rounded-sm border border-primary shadow-sm transition-all group-data-[collapsible=icon]:rounded-md">
              <Plus className="size-4 text-primary" strokeWidth={2} />
            </div>
            Add Organisation
          </SidebarMenuButton>
          {organisations.map((organisation) => (
            <SidebarMenuButton
              className="group h-12 rounded-md border border-transparent transition-all data-[state=open]:bg-transparent group-data-[collapsible=icon]:rounded-2xl"
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
            className="group h-12 rounded-md border border-transparent transition-all data-[state=open]:bg-transparent group-data-[collapsible=icon]:rounded-2xl"
            onClick={() => setOpen(!open)}
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
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
