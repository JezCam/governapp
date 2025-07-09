'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import AddTeamMemberDialog from '@/components/dialogs/add-team-member-dialog';
import TeamMemberDropdownContent from '@/components/team-member-dropdown-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/user-avatar';

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

export const columns: ColumnDef<TeamMember>[] = [
  {
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <UserAvatar user={row.original} />
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    header: 'Role',
    cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
  },
  {
    accessorKey: 'permission',
    header: 'Permission',
    cell: ({ row }) => <Badge variant={row.getValue('permission')} />,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="float-right size-7" size="icon" variant="outline">
            <HugeiconsIcon icon={MoreHorizontalIcon} />
          </Button>
        </DropdownMenuTrigger>
        <TeamMemberDropdownContent user={row.original} />
      </DropdownMenu>
    ),
  },
];

export default function TeamMembersTable() {
  const [addTeamMemberOpen, setAddTeamMemberOpen] = useState(false);

  return (
    <>
      <AddTeamMemberDialog
        onOpenChange={setAddTeamMemberOpen}
        open={addTeamMemberOpen}
      />
      <DataTable
        actionOnClick={() => setAddTeamMemberOpen(true)}
        actionText="Add team member"
        columns={columns}
        data={teamMembers}
        title="Team Members"
      />
    </>
  );
}
