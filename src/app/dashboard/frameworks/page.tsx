'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import FrameworkDetailsDialog from '@/components/dialogs/framework-details-dialog';
import FrameworkLabel from '@/components/labels/framework-label';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Framework, frameworks } from '@/dummy-data/frameworks';
import { formatDateTime } from '@/lib/utils';
import FrameworkStore from './framework-store';

const getFrameworkColumns = (
  onOpenDetails: (framework: Framework) => void
): ColumnDef<Framework>[] => [
  {
    size: 35,
    maxSize: 35,
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.original.name;
      return <FrameworkLabel name={name} variant="framework" />;
    },
  },
  {
    size: 10,
    maxSize: 10,
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.type;
      return <Badge variant={type} />;
    },
  },
  {
    size: 20,
    maxSize: 20,
    accessorKey: 'authority',
    header: 'Authority',
  },
  {
    size: 15,
    maxSize: 15,
    accessorKey: 'monthlyCost',
    header: ({ column }) => (
      <SortButton column={column}>Monthly Cost</SortButton>
    ),
    cell: ({ row }) => {
      const cost = row.original.monthlyCost;
      return `$${cost.toFixed(2)}`;
    },
  },
  {
    size: 20,
    maxSize: 20,
    accessorKey: 'subscribedOn',
    header: ({ column }) => (
      <SortButton column={column}>Subscribed On</SortButton>
    ),
    cell: ({ row }) => {
      const subscribedOn = row.original.subscribedOn;
      return formatDateTime(subscribedOn.getTime());
    },
  },
  {
    id: 'menu',
    cell: ({ row }) => (
      <Button
        className="float-right size-8"
        onClick={() => onOpenDetails(row.original)}
        size="icon"
        variant="outline"
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} />
      </Button>
    ),
  },
];

export default function Frameworks() {
  const [detailsFramework, setDetailsFramework] = useState<Framework>();

  const columns = getFrameworkColumns((framework) =>
    setDetailsFramework(framework)
  );

  return (
    <div className="flex size-full flex-col gap-8 overflow-auto p-4">
      <FrameworkDetailsDialog
        onOpenChange={(open) => {
          if (!open) {
            setDetailsFramework(undefined);
          }
        }}
        open={!!detailsFramework}
      />
      <DataTable
        columns={columns}
        data={frameworks}
        hasMenu
        minWidth="800px"
        title="Your Frameworks"
      />
      <FrameworkStore />
    </div>
  );
}
