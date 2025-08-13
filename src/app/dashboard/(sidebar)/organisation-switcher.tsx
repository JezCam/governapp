/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { useMutation, useQuery } from 'convex/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import OrganisationAvatar from '@/components/avatars/organisation-avatar';
import AddOrganisationDialog from '@/components/dialogs/add-organisation-dialog';
import LoadingButton from '@/components/loading-button';
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
  const updateCurrentUser = useMutation(api.services.users.updateCurrent);

  const membershipsWithoutActive = memberships?.filter(
    (membership) => membership.organisation._id !== activeOrganisation?._id
  );

  const [addOrganisationOpen, setAddOrganisationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
            className="group h-12 whitespace-nowrap rounded-md border border-transparent font-medium transition-[background-color_border-radius] data-[state=open]:bg-transparent group-data-[collapsible=icon]:rounded-2xl"
            onClick={() => {
              setOpen(!open);
              setAddOrganisationOpen(true);
            }}
            size="lg"
            tooltip="Add Organisation"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-primary transition-[border-radius] group-data-[collapsible=icon]:rounded-md">
              <Plus className="size-4 text-primary" strokeWidth={2} />
            </div>
            Add Organisation
          </SidebarMenuButton>
          {membershipsWithoutActive.map((membership) => (
            <SidebarMenuButton
              asChild
              className="group h-12 rounded-md border border-transparent transition-[border-radius] data-[state=open]:bg-transparent group-data-[collapsible=icon]:rounded-2xl"
              key={membership.organisation._id}
              onClick={() => {
                setIsLoading(true);
                updateCurrentUser({
                  activeOrganisationId: membership.organisation._id,
                })
                  .then(() => {
                    toast.success(
                      `Switched to ${membership.organisation.name}`
                    );
                    setIsLoading(false);
                    setOpen(false);
                  })
                  .catch((error) => {
                    console.error('Error switching organisation:', error);
                    toast.error('Failed to switch organisation');
                    setIsLoading(false);
                  });
              }}
              size="lg"
              tooltip={membership.organisation.name}
            >
              <LoadingButton
                className="justify-start"
                isLoading={isLoading}
                variant="ghost"
              >
                <OrganisationAvatar
                  className="size-8 border-white transition-[border-radius] group-data-[collapsible=icon]:rounded-md dark:border-black"
                  organisation={membership.organisation}
                />
                <span className="truncate font-medium">
                  {membership.organisation.name}
                </span>
              </LoadingButton>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>

        {/* Active organisation */}
        <SidebarMenuItem className="flex items-center justify-between">
          <SidebarMenuButton
            className="group h-12 rounded-md border border-transparent transition-[border-radius] group-data-[collapsible=icon]:rounded-2xl"
            onClick={() => setOpen(!open)}
            size="lg"
            tooltip={activeOrganisation.name}
          >
            <OrganisationAvatar
              className="size-8 border-white transition-[border-radius] group-data-[collapsible=icon]:rounded-md dark:border-black"
              organisation={activeOrganisation}
            />
            <span className="truncate font-medium">
              {activeOrganisation.name}
            </span>
            <UnfoldClose className="ml-auto" open={open} />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
