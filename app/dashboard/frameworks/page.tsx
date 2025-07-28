'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import FrameworkLabel from '@/components/labels/framework-label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Framework, frameworks } from '@/dummy-data/frameworks';

const columns: ColumnDef<Framework>[] = [
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
    cell: () => (
      <Button className="float-right size-8" size="icon" variant="outline">
        <HugeiconsIcon icon={MoreHorizontalIcon} />
      </Button>
    ),
  },
];

export default function Frameworks() {
  return (
    <div className="size-full p-4">
      <DataTable
        actionOnClick={() => {}}
        actionText="See additional frameworks"
        columns={columns}
        data={frameworks}
        hasMenu
        title="Frameworks"
      />
    </div>
  );
}
