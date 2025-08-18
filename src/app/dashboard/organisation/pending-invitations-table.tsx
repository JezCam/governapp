'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreVerticalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useQuery } from 'convex/react';
import { DataTable } from '@/components/data-table/data-table';
import InvitationDropdownMenu from '@/components/invitations/invitation-dropdown-menu';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Invitation } from '@/types/convex';
import { api } from '../../../../convex/_generated/api';

export const columns: ColumnDef<Invitation>[] = [
  {
    size: 33,
    maxSize: 33,
    accessorKey: 'inviteeEmail',
    header: ({ column }) => <SortButton column={column}>Email</SortButton>,
  },
  {
    size: 33,
    maxSize: 33,
    accessorKey: 'role',
    header: ({ column }) => <SortButton column={column}>Role</SortButton>,
    cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
  },
  {
    size: 33,
    maxSize: 33,
    accessorKey: 'isAdmin',
    header: ({ column }) => <SortButton column={column}>Permission</SortButton>,
    cell: ({ row }) => {
      const isAdmin = row.original.isAdmin;
      return <Badge variant={isAdmin ? 'admin' : 'member'} />;
    },
  },
  {
    id: 'menu',
    cell: ({ row }) => (
      <InvitationDropdownMenu invitation={row.original}>
        <Button className="float-right size-8" size="icon" variant="outline">
          <HugeiconsIcon icon={MoreVerticalIcon} />
        </Button>
      </InvitationDropdownMenu>
    ),
  },
];

export default function PendingInvitationsTable() {
  const pendingInvitations = useQuery(
    api.services.invitations.listPendingByActiveOrganisation
  );

  if (pendingInvitations === undefined) {
    return <div>Loading...</div>; // TODO: Implement a loading state
  }

  return (
    <DataTable
      className="h-fit"
      columns={columns}
      data={pendingInvitations}
      hasMenu
      minWidth="600px"
      title="Pending Invitations"
    />
  );
}
