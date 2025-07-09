'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table';
import InvitationDropdownMenu from '@/components/invitation-dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Invitation = {
  email: string;
  role: string;
  permission: 'admin' | 'member';
};

const pendingInvitations: Invitation[] = [
  {
    email: 'john@example.com',
    role: 'Board Member',
    permission: 'member',
  },
  {
    email: 'jill@example.com',
    role: 'Board Member',
    permission: 'member',
  },
];

export const columns: ColumnDef<Invitation>[] = [
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
