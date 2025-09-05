import type { ColumnDef } from '@tanstack/react-table';
import { useQuery } from 'convex/react';
import ExpandChevron from '@/components/expand-chevron';
import FrameworkLabel from '@/components/labels/framework-label';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Framework } from '@/types/convex';
import { api } from '../../../../convex/_generated/api';
import { FrameworksStoreDataTable } from './framework-store-data-table';

const columns: ColumnDef<Framework>[] = [
  {
    size: 40,
    maxSize: 40,
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="flex gap-2">
          <ExpandChevron
            className="mt-0.75 shrink-0"
            expanded={row.getIsExpanded()}
          />
          <FrameworkLabel name={name} variant="framework" />
        </div>
      );
    },
  },
  {
    size: 15,
    maxSize: 15,
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
    size: 10,
    maxSize: 10,
    id: 'menu',
    cell: () => {
      return (
        <Button className="w-full" size="sm">
          Subscribe
        </Button>
      );
    },
  },
];
export default function FrameworkStore() {
  const frameworks = useQuery(
    api.services.frameworks.listUnsubscribedForActiveOrganisation
  );

  if (frameworks === undefined) {
    return null; // TODO: Add loading state
  }

  return <FrameworksStoreDataTable columns={columns} data={frameworks} />;
}
