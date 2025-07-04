'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Edit04Icon,
  MoreHorizontalIcon,
  PlusSignCircleIcon,
  UserGroupIcon,
  UserMinus02Icon,
  ZapIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import AddTeamMemberDialogContent from './dialogs/add-team-member-dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar';
import UserAvatar from './user-avatar';

type TeamMember = {
  userId: number;
  name: string;
  email: string;
  role: string;
  permission: 'admin' | 'member';
  imageUrl: string;
};

const teamMembers: TeamMember[] = [
  {
    userId: 0,
    name: 'Jeremy Cameron',
    email: 'jeremy@cameron.org.au',
    role: 'Chief Executive Officer',
    permission: 'admin',
    imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
  },
  {
    userId: 1,
    name: 'Alice Johnson',
    email: 'alice.j@acme.inc',
    role: 'Chief Executive Officer',
    permission: 'admin',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    userId: 2,
    name: 'Bob Smith',
    email: 'bobrocks@gmail.com',
    role: 'Chair',
    permission: 'member',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    userId: 3,
    name: 'Charlie Brown',
    email: 'charliethekid@email.com',
    role: 'Treasurer',
    permission: 'member',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
  },
  {
    userId: 4,
    name: 'Diana Prince',
    email: 'dianatheprince@gmail.com',
    role: 'Vice Chair',
    permission: 'member',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
];

export default function NavTeam() {
  const [_open, setOpen] = useState(true);
  const { open } = useSidebar();
  const [addTeamMemberOpen, setAddTeamMemberOpen] = useState(false);

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
              <SidebarMenuButton className="h-12.5 min-w-fit gap-9 overflow-clip whitespace-nowrap rounded-xl border border-transparent font-medium transition-all transition-discrete group-data-[collapsible=icon]:h-0 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:opacity-0">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center [&>svg]:size-4.5">
                    <HugeiconsIcon
                      className="text-sidebar-primary"
                      icon={UserGroupIcon}
                      strokeWidth={2}
                    />
                  </div>
                  Team Members
                  <Badge className="rounded-sm px-1.5" variant="blue">
                    {teamMembers.length}
                  </Badge>
                </div>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="[&>ul]:m-0 [&>ul]:border-none [&>ul]:p-1">
              <SidebarMenu className="gap-0">
                {teamMembers.map((member) => (
                  <SidebarMenuItem key={member.userId}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <SidebarMenuButton
                          className="h-fit gap-2.5 p-1.75 group-data-[collapsible=icon]:rounded-full"
                          tooltip={member.name}
                        >
                          <UserAvatar
                            className="size-7 border-sidebar-border"
                            user={member}
                          />
                          <span className="truncate font-medium">
                            {member.name}
                          </span>
                        </SidebarMenuButton>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="flex w-80 flex-col gap-2 rounded-xl p-2 pb-4"
                        side="right"
                      >
                        <div className="relative mb-6 h-20 rounded-sm bg-primary">
                          <UserAvatar
                            className="-bottom-6 absolute left-3 size-16 border-none ring-4 ring-popover"
                            user={member}
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                className="!bg-black/30 !border-white/30 absolute top-2 right-2 size-8 rounded-full !hover:bg-black/15 text-white hover:text-white"
                                size="icon"
                                variant="outline"
                              >
                                <HugeiconsIcon icon={MoreHorizontalIcon} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="start"
                              className="w-60 font-medium"
                              side="right"
                            >
                              <DropdownMenuItem className="gap-2 p-2">
                                <HugeiconsIcon icon={ZapIcon} strokeWidth={2} />
                                View assigned actions
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 p-2">
                                <HugeiconsIcon
                                  icon={Edit04Icon}
                                  strokeWidth={2}
                                />
                                Edit member details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:!text-destructive hover:!bg-destructive/10 gap-2 p-2 text-destructive">
                                <HugeiconsIcon
                                  className="text-destructive"
                                  icon={UserMinus02Icon}
                                  strokeWidth={2}
                                />
                                Remove from Team
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex flex-col gap-4 px-3">
                          <div className="flex h-fit flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{member.name}</span>
                              <Badge
                                className="h-fit"
                                variant={member.permission}
                              />
                            </div>
                            <span className="text-xs">{member.email}</span>
                          </div>
                          <Badge variant="outline">{member.role}</Badge>
                          {member.userId === 0 && (
                            <Button variant="secondary">
                              <HugeiconsIcon
                                icon={Edit04Icon}
                                strokeWidth={2}
                              />
                              Edit Profile
                            </Button>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </SidebarMenuItem>
                ))}
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
