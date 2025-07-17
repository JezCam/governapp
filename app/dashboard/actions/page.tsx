'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Hexagon01Icon } from '@hugeicons-pro/core-solid-rounded';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import DueDateLabel from '@/app/dashboard/actions/due-date';
import ExpandChevron from '@/components/expand-chevron';
import UserLabel from '@/components/labels/user-label';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
import { type ActionsRow, assessmentActionsRows } from '@/dummy-data/actions';
import { cn } from '@/lib/utils';
import { ActionsDataTable } from './actions-data-table';

// import DueDatesOverview from './due-dates-overview-cell';

const columns: ColumnDef<ActionsRow>[] = [
  {
    id: 'first',
    size: 40,
    maxSize: 40,
    accessorFn: (row) => {
      switch (row.type) {
        case 'assessment':
          return row.name;
        case 'risk':
          return row.risk;
        case 'action':
          return row.text;
        default:
      }
    },
    header: undefined,
    cell: ({ row }) => {
      switch (row.original.type) {
        case 'assessment':
          return (
            <div className="flex gap-2">
              <ExpandChevron
                className="mt-0.75 shrink-0"
                expanded={row.getIsExpanded()}
              />
              <div className="flex w-full flex-col">
                <span className="line-clamp-1 truncate font-medium text-base">
                  {row.original.name}
                </span>
                <div className="flex items-center gap-1">
                  {/* Framework Icon */}
                  <HugeiconsIcon
                    className="size-3.5 text-primary"
                    icon={Hexagon01Icon}
                  />
                  <span className="line-clamp-1 truncate font-medium text-primary">
                    {row.original.framework}
                  </span>
                </div>
              </div>
            </div>
          );
        case 'risk':
          return (
            <div className="flex items-center gap-2">
              <ExpandChevron className="ml-6" expanded={row.getIsExpanded()} />
              <Badge variant={row.original.risk} />
            </div>
          );
        case 'action':
          return (
            <div className="flex w-full gap-2">
              <ExpandChevron
                className="mt-0.5 ml-12 shrink-0"
                expanded={row.getIsExpanded()}
              />
              <span
                className={cn(
                  'whitespace-pre-wrap font-medium',
                  row.getIsExpanded() ? '' : 'line-clamp-1 truncate'
                )}
              >
                {row.original.text}
              </span>
            </div>
          );
        default:
      }
    },
  },
  {
    size: 15,
    maxSize: 15,
    id: 'progress',
    accessorFn: (row) => {
      if (row.type === 'action') {
        return row.status;
      }
      return null;
    },
    header: ({ column }) => <SortButton column={column}>Progress</SortButton>,
    cell: ({ row }) => {
      if (row.original.type === 'action') {
        return <Badge variant={row.original.status} />;
      }
    },
  },
  {
    size: 15,
    maxSize: 15,
    accessorKey: 'dueDate',
    header: ({ column }) => <SortButton column={column}>Due Date</SortButton>,
    cell: ({ row }) => {
      if (row.original.type === 'assessment') {
        // return <DueDatesOverview actionDueSummary={row.original.dueSummary} />;
        // <span className="font-medium text-xs">
        //   {row.original.assessmentType === 'self' ? 'Completed' : 'Closed'}{' '}
        //   {formatDateTime(row.original.date.getTime())}
        // </span>
      }
      if (row.original.type === 'risk') {
        // return <DueDatesOverview actionDueSummary={row.original.dueSummary} />;
      }
      if (row.original.type === 'action') {
        const dueDate = row.original.dueDate;
        return <DueDateLabel dueDate={dueDate} />;
      }
    },
  },
  {
    size: 15,
    maxSize: 15,
    id: 'assignee',
    header: 'Assignee/s',
    accessorKey: 'assignee.userId',
    cell: ({ row }) => {
      if (row.original.type === 'assessment') {
        return;
      }
      if (row.original.type === 'risk') {
        return;
      }
      if (row.original.type === 'action') {
        const assignee = row.original.assignee;
        return <UserLabel user={assignee} />;
      }
    },
  },
  {
    size: 10,
    maxSize: 10,
    header: 'Resource',
  },
  {
    size: 5,
    maxSize: 5,
    id: 'menu',
    cell: ({ row }) => {
      if (row.original.type === 'assessment') {
        return;
      }
      if (row.original.type === 'risk') {
        return;
      }
      if (row.original.type === 'action') {
        return (
          <Button className="float-right size-7" size="icon" variant="outline">
            <HugeiconsIcon icon={MoreHorizontalIcon} />
          </Button>
        );
      }
    },
  },
];

export default function Actions() {
  return (
    <div className="flex size-full flex-col gap-4 p-4">
      <ActionsDataTable columns={columns} data={assessmentActionsRows} />
    </div>
  );
}
