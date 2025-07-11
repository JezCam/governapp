'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import AddTeamMemberDialog from '@/components/dialogs/add-team-member-dialog';
import SortButton from '@/components/sort-button';
import TeamMemberDropdownContent from '@/components/team-member-dropdown-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/user-avatar';
import { type TeamMember, teamMembers } from '@/dummy-data/team';
import { teamMemberDataTableContext } from './context';

export const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortButton column={column}>Name</SortButton>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <UserAvatar user={row.original} />
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortButton column={column}>Email</SortButton>,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <SortButton column={column}>Role</SortButton>,
    cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
  },
  {
    accessorKey: 'permission',
    header: ({ column }) => <SortButton column={column}>Permission</SortButton>,
    cell: ({ row }) => <Badge variant={row.getValue('permission')} />,
  },
  {
    id: 'menu',
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
        context={teamMemberDataTableContext}
        data={teamMembers}
        searchable
        searchPlaceholder="Search for a team member"
        title={'Team Members'}
      />
    </>
  );
}
