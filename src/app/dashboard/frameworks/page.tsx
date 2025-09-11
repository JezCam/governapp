'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useQuery } from 'convex/react';
import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import SubscriptionDetailsDialog from '@/components/dialogs/subscription-details-dialog';
import FrameworkLabel from '@/components/labels/framework-label';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/lib/utils';
import type { Framework, Subscription } from '@/types/convex';
import { api } from '../../../../convex/_generated/api';
import FrameworkStore from './framework-store';

const getFrameworkColumns = (
  onOpenDetails: (subscription: Subscription) => void
): ColumnDef<Subscription & { framework: Framework }>[] => [
  {
    size: 35,
    maxSize: 35,
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.original.framework.name;
      return <FrameworkLabel name={name} variant="framework" />;
    },
  },
  {
    size: 10,
    maxSize: 10,
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.framework.type;
      return <Badge variant={type} />;
    },
  },
  {
    size: 20,
    maxSize: 20,
    accessorKey: 'framework.authority',
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
      const cost = row.original.framework.monthlyCost;
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
      const subscribedAt = row.original.lastRenewalDate;
      return formatDateTime(subscribedAt);
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
  const frameworkSubscriptions = useQuery(
    api.services.subscriptions.listForActiveOrganisationWithFrameworks
  );

  const [detailsSubscription, setDetailsSubscription] =
    useState<Subscription>();

  const columns = getFrameworkColumns((subscription) =>
    setDetailsSubscription(subscription)
  );

  if (frameworkSubscriptions === undefined) {
    return null; // TODO: Add loading state
  }

  return (
    <div className="flex size-full flex-col gap-8 overflow-auto p-4">
      <SubscriptionDetailsDialog
        onOpenChange={(open) => {
          if (!open) {
            setDetailsSubscription(undefined);
          }
        }}
        open={!!detailsSubscription}
      />
      <DataTable
        columns={columns}
        data={frameworkSubscriptions}
        hasMenu
        minWidth="800px"
        title="Your Frameworks"
      />
      <FrameworkStore />
    </div>
  );
}
