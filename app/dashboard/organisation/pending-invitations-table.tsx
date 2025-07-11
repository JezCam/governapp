'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import InvitationDropdownMenu from '@/components/invitation-dropdown-menu';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Invitation, pendingInvitations } from '@/dummy-data/invitations';

export const columns: ColumnDef<Invitation>[] = [
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
      <InvitationDropdownMenu invitation={row.original}>
        <Button className="float-right size-7" size="icon" variant="outline">
          <HugeiconsIcon icon={MoreHorizontalIcon} />
        </Button>
      </InvitationDropdownMenu>
    ),
  },
];

export default function PendingInvitationsTable() {
  return (
    <DataTable
      columns={columns}
      data={pendingInvitations}
      title="Pending Invitations"
    />
  );
}
