'use client';

import { useQuery } from 'convex/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import OrganisationAvatar from '@/components/avatars/organisation-avatar';
import AddOrganisationDialog from '@/components/dialogs/add-organisation-dialog';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import UnfoldClose from '@/components/unfold-close';
import { cn } from '@/lib/utils';
import { api } from '../../../../convex/_generated/api';

export default function OrganisationSwitcher({
  open,
  setOpen,
}: {
  open: boolean;
  // biome-ignore lint/nursery/noShadow: <explanation>
  setOpen: (open: boolean) => void;
}) {
  const activeOrganisation = useQuery(api.services.organisations.getActive);
  const memberships = useQuery(
    api.services.memberships.listForCurrentUserWithOrganisation
  );

  const membershipsWithoutActive = memberships?.filter(
    (membership) => membership.organisation._id !== activeOrganisation?._id
  );

  const [addOrganisationOpen, setAddOrganisationOpen] = useState(false);

  if (
    membershipsWithoutActive === undefined ||
    activeOrganisation === undefined
  ) {
    return null; // TODO: Add skeletons for memberships = undefined
  }

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
            tooltip="Add Organisation"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-primary transition-all group-data-[collapsible=icon]:rounded-md">
              <Plus className="size-4 text-primary" strokeWidth={2} />
            </div>
            Add Organisation
          </SidebarMenuButton>
          {membershipsWithoutActive.map((membership) => (
            <SidebarMenuButton
              className="group h-12 rounded-md border border-transparent transition-all data-[state=open]:bg-transparent group-data-[collapsible=icon]:rounded-2xl"
              key={membership.organisation._id}
              size="lg"
              tooltip={membership.organisation.name}
            >
              <div className="size-8 rounded-sm border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground shadow-sm transition-all group-data-[collapsible=icon]:rounded-md" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {membership.organisation.name}
                </span>
              </div>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>
        {/* Active organisation */}
        <SidebarMenuItem className="flex items-center justify-between">
          <SidebarMenuButton
            className="group h-12 rounded-md border border-transparent transition-all data-[state=open]:bg-transparent group-data-[collapsible=icon]:rounded-2xl"
            onClick={() => setOpen(!open)}
            size="lg"
            tooltip={activeOrganisation.name}
          >
            <OrganisationAvatar
              className="size-8 rounded-sm border-white bg-sidebar-primary text-sidebar-primary-foreground shadow-sm transition-all group-data-[collapsible=icon]:rounded-md"
              organisation={activeOrganisation}
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {activeOrganisation.name}
              </span>
            </div>
            <UnfoldClose className="ml-auto" open={open} />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
