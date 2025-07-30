'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreVerticalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import AddTeamMemberDialog from '@/components/dialogs/add-team-member-dialog';
import UserLabel from '@/components/labels/user-label';
import SortButton from '@/components/sort-button';
import TeamMemberPopoverDropdown from '@/components/team-member-popover-dropdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type TeamMember, teamMembers } from '@/dummy-data/team';

export const columns: ColumnDef<TeamMember>[] = [
  {
    size: 30,
    maxSize: 30,
    accessorKey: 'name',
    header: ({ column }) => <SortButton column={column}>Name</SortButton>,
    cell: ({ row }) => <UserLabel user={row.original} />,
  },
  {
    size: 30,
    maxSize: 30,
    accessorKey: 'email',
    header: ({ column }) => <SortButton column={column}>Email</SortButton>,
  },
  {
    size: 25,
    maxSize: 25,
    accessorKey: 'role',
    header: ({ column }) => <SortButton column={column}>Role</SortButton>,
    cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
  },
  {
    size: 15,
    maxSize: 15,
    accessorKey: 'permission',
    header: ({ column }) => <SortButton column={column}>Permission</SortButton>,
    cell: ({ row }) => <Badge variant={row.getValue('permission')} />,
  },
  {
    id: 'menu',
    cell: ({ row }) => (
      <TeamMemberPopoverDropdown user={row.original}>
        <DropdownMenuTrigger asChild>
          <Button className="float-right size-8" size="icon" variant="outline">
            <HugeiconsIcon icon={MoreVerticalIcon} />
          </Button>
        </DropdownMenuTrigger>
      </TeamMemberPopoverDropdown>
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
        className="h-fit"
        columns={columns}
        data={teamMembers}
        hasMenu
        minWidth="900px"
        searchable
        searchPlaceholder="Search for a team member"
        title={'Team Members'}
      />
    </>
  );
}
