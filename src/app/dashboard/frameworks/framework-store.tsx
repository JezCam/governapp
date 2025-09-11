'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useQuery } from 'convex/react';
import { useState } from 'react';
import ActivateButton from '@/components/activate-button';
import ExpandChevron from '@/components/expand-chevron';
import FrameworkLabel from '@/components/labels/framework-label';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Framework } from '@/types/convex';
import { api } from '../../../../convex/_generated/api';
import FrameworkFreeButton from './framework-free-button';
import { FrameworksStoreDataTable } from './framework-store-data-table';
import FrameworkSubscribeButton from './framework-subscribe-button';

const getFrameworkStoreColumns = (
  inactiveSubscribe?: () => void
): ColumnDef<Framework>[] => [
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
    cell: ({ row }) => {
      if (row.original.monthlyCost === 0) {
        return (
          <FrameworkFreeButton
            className="w-full"
            frameworkId={row.original._id}
          />
        );
      }
      if (inactiveSubscribe) {
        return (
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              inactiveSubscribe();
            }}
            size="sm"
          >
            Subscribe
          </Button>
        );
      }
      return (
        <FrameworkSubscribeButton
          className="w-full"
          priceLookupKey={row.original.priceLookupKey}
        />
      );
    },
  },
];
export default function FrameworkStore() {
  const isActive = useQuery(api.services.organisations.isActiveActive);
  const frameworks = useQuery(
    api.services.frameworks.listUnsubscribedForActiveOrganisation
  );

  const [open, setOpen] = useState(false);

  const columns = getFrameworkStoreColumns(
    isActive ? undefined : () => setOpen(true)
  );

  if (frameworks === undefined || isActive === undefined) {
    return null; // TODO: Add loading state
  }

  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate Organisation</DialogTitle>
            <DialogDescription>
              In order to subscribe to a framework, you first need to activate
              your organisation.
            </DialogDescription>
          </DialogHeader>
          <ActivateButton className="w-fit" />
        </DialogContent>
      </Dialog>
      <FrameworksStoreDataTable columns={columns} data={frameworks} />
    </>
  );
}
