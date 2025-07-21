"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon } from "@hugeicons-pro/core-stroke-rounded";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import InvitationDropdownMenu from "@/components/invitation-dropdown-menu";
import SortButton from "@/components/sort-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Invitation, pendingInvitations } from "@/dummy-data/invitations";

export const columns: ColumnDef<Invitation>[] = [
  {
    size: 33,
    maxSize: 33,
    accessorKey: "email",
    header: ({ column }) => <SortButton column={column}>Email</SortButton>,
  },
  {
    size: 33,
    maxSize: 33,
    accessorKey: "role",
    header: ({ column }) => <SortButton column={column}>Role</SortButton>,
    cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
  },
  {
    size: 33,
    maxSize: 33,
    accessorKey: "permission",
    header: ({ column }) => <SortButton column={column}>Permission</SortButton>,
    cell: ({ row }) => <Badge variant={row.getValue("permission")} />,
  },
  {
    id: "menu",
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
  return (
    <DataTable
      className="h-fit"
      columns={columns}
      data={pendingInvitations}
      minWidth="600px"
      title="Pending Invitations"
    />
  );
}
