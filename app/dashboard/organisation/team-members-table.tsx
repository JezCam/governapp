'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import { useState } from 'react';
import AddTeamMemberDialog from '@/components/dialogs/add-team-member-dialog';
import TeamMemberDropdownContent from '@/components/team-member-dropdown-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import UserAvatar from '@/components/user-avatar';
import { cn } from '@/lib/utils';

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

export default function TeamMembersTable() {
  const [addTeamMemberOpen, setAddTeamMemberOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <h2 className="font-medium text-base">Team Members</h2>
          <Badge className="rounded-sm px-1.5" variant="blue">
            {teamMembers.length}
          </Badge>
        </div>
        <AddTeamMemberDialog
          onOpenChange={setAddTeamMemberOpen}
          open={addTeamMemberOpen}
        />
        <Button onClick={() => setAddTeamMemberOpen(true)} size="sm">
          Add Team Member
        </Button>
      </div>
      <div className="border-t bg-accent px-2 pb-2">
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            <TableRow className="border-none bg-accent [&>th]:border-l [&>th]:px-3 [&>th]:first:border-l-0 [&>th]:last:border-l-0">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Permission</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow
                className={cn(
                  'group border-none [&>td]:bg-background [&>td]:px-3 [&>td]:last:border-l-0 [&>td]:group-hover:bg-blue-50 dark:[&>td]:group-hover:bg-blue-950/50',
                  // Table Cell Borders
                  '[&>td]:[border-width:_0_0_1px_1px] [&>td]:not-first:[border-left-style:_dashed] [&>td]:last:border-r',
                  // First Row
                  'first:[&>td]:border-t',
                  // Top Left
                  'first:[&>td]:first:rounded-tl-md first:[&>td]:first:border-solid first:[&>td]:first:[border-width:_1px_0_1px_1px]',
                  // Top Right
                  'first:[&>td]:last:rounded-tr-md first:[&>td]:last:border-solid first:[&>td]:last:[border-width:_1px_1px_1px_0]',
                  // Bottom Left
                  'last:[&>td]:first:rounded-bl-md last:[&>td]:first:border-solid last:[&>td]:first:[border-width:_0_0_1px_1px]',
                  // Bottom Right
                  'last:[&>td]:last:rounded-br-md last:[&>td]:last:border-solid last:[&>td]:last:[border-width:_0_1px_1px_0]'
                )}
                key={member.userId}
              >
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <UserAvatar user={member} />
                    <span className="font-medium">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{member.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={member.permission} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="float-right size-7"
                        size="icon"
                        variant="outline"
                      >
                        <HugeiconsIcon icon={MoreHorizontalIcon} />
                      </Button>
                    </DropdownMenuTrigger>
                    <TeamMemberDropdownContent user={member} />
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
