'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import FrameworkDetailsDialog from '@/components/dialogs/framework-details-dialog';
import FrameworkLabel from '@/components/labels/framework-label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Framework, frameworks } from '@/dummy-data/frameworks';

const getFrameworkColumns = (
  onOpenDetails: (framework: Framework) => void
): ColumnDef<Framework>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.original.name;
      return <FrameworkLabel name={name} variant="framework" />;
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.type;
      return <Badge variant={type} />;
    },
  },
  {
    accessorKey: 'authority',
    header: 'Authority',
  },
  {
    accessorKey: 'monthlyCost',
    header: 'Monthly Cost',
    cell: ({ row }) => {
      const cost = row.original.monthlyCost;
      return `$${cost.toFixed(2)}`;
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
    <div className="size-full p-4">
      <FrameworkDetailsDialog
        onOpenChange={(open) => {
          if (!open) {
            setDetailsFramework(undefined);
          }
        }}
        open={!!detailsFramework}
      />
      <DataTable
        actionOnClick={() => {}}
        actionText="See additional frameworks"
        columns={columns}
        data={frameworks}
        hasMenu
        title="Your Frameworks"
      />
    </div>
  );
}
