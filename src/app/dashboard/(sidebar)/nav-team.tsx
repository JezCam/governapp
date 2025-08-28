'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlusSignCircleIcon,
  UserGroupIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import { useQuery } from 'convex/react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import UserAvatar from '@/components/avatars/user-avatar';
import AddTeamMemberDialogContent from '@/components/dialogs/add-team-member-dialog';
import MembershipPopover from '@/components/memberships/membership-popover';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { api } from '../../../../convex/_generated/api';
import { useUserContext } from '../context';

export default function NavTeam() {
  const { currentUser } = useUserContext();

  const memberships = useQuery(
    api.services.memberships.listInActiveOrganisationWithUsers
  );

  const [_open, setOpen] = useState(true);
  const { open } = useSidebar();
  const [addTeamMemberOpen, setAddTeamMemberOpen] = useState(false);

  if (memberships === undefined) {
    return null; // TODO: Add skeletons for memberships = undefined
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible
          className="group/collapsible"
          onOpenChange={setOpen}
          open={open ? _open : true}
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="h-12.5 w-full overflow-clip whitespace-nowrap rounded-xl border border-transparent font-medium transition-[opacity_height] group-data-[collapsible=icon]:h-0 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:opacity-0">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center [&>svg]:size-4.5">
                    <HugeiconsIcon
                      className="text-sidebar-primary"
                      icon={UserGroupIcon}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    Team Members
                    <Badge variant="blue">{memberships.length}</Badge>
                  </div>
                </div>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="[&>ul]:m-0 [&>ul]:border-none [&>ul]:p-1">
              <SidebarMenu className="gap-0">
                {memberships.map((membership) => {
                  const user = membership.user;
                  const name = `${user.firstName} ${user.lastName}`;
                  return (
                    <SidebarMenuItem key={user._id}>
                      <MembershipPopover membership={membership}>
                        <SidebarMenuButton
                          className="h-fit gap-2.5 p-1.75 group-data-[collapsible=icon]:rounded-full"
                          tooltip={name}
                        >
                          <UserAvatar
                            className="size-7 border-background"
                            user={user}
                          />
                          <span className="truncate font-medium">{name}</span>
                          {currentUser._id === user._id && (
                            <Badge
                              className="border-primary/15 bg-sidebar-accent text-sidebar-accent-foreground"
                              variant="outline"
                            >
                              You
                            </Badge>
                          )}
                        </SidebarMenuButton>
                      </MembershipPopover>
                    </SidebarMenuItem>
                  );
                })}
                <AddTeamMemberDialogContent
                  onOpenChange={setAddTeamMemberOpen}
                  open={addTeamMemberOpen}
                />
                <SidebarMenuButton
                  className="mt-2 h-fit gap-2.5 whitespace-nowrap p-1.75 font-medium group-data-[collapsible=icon]:rounded-full"
                  onClick={() => setAddTeamMemberOpen(true)}
                  tooltip="Add Team Member"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center [&>svg]:size-4.5 [&>svg]:text-sidebar-primary">
                    <HugeiconsIcon icon={PlusSignCircleIcon} strokeWidth={2} />
                  </div>
                  Add Team Member
                </SidebarMenuButton>
              </SidebarMenu>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
