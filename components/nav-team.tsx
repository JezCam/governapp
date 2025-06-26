'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { UserGroupIcon } from '@hugeicons-pro/core-stroke-rounded';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar';

const teamMembers = [
  {
    userId: 1,
    name: 'Alice Johnson',
    role: '',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    userId: 2,
    name: 'Bob Smith',
    role: '',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    userId: 3,
    name: 'Charlie Brown',
    role: '',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
  },
  {
    userId: 4,
    name: 'Diana Prince',
    role: '',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    userId: 5,
    name: 'Ethan Hunt',
    role: '',
    imageUrl: 'https://i.pravatar.cc/150?img=6',
  },
];

export default function NavTeam() {
  const [_open, setOpen] = useState(true);
  const { open } = useSidebar();

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
              <SidebarMenuButton className="h-12.5 min-w-fit overflow-clip whitespace-nowrap rounded-xl border border-transparent font-medium transition-all transition-discrete group-data-[collapsible=icon]:h-0 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:opacity-0">
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
            <CollapsibleContent className=" [&>ul]:m-0 [&>ul]:border-none [&>ul]:p-2">
              <SidebarMenu className="gap-2">
                {teamMembers.map((member) => (
                  <SidebarMenuItem key={member.userId}>
                    <SidebarMenuButton
                      className="h-fit gap-2.5 p-0.75"
                      tooltip={member.name}
                    >
                      <Avatar className="size-7 border border-sidebar-border shadow-sm">
                        <AvatarImage src={member.imageUrl} />
                        <AvatarFallback className="flex size-full items-center justify-center bg-background text-foreground">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate font-medium">
                        {member.name}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
