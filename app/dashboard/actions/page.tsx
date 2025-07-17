'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Hexagon01Icon } from '@hugeicons-pro/core-solid-rounded';
import { Comment01Icon, Edit04Icon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import DueDateLabel from '@/app/dashboard/actions/due-date';
import ExpandChevron from '@/components/expand-chevron';
import UserLabel from '@/components/labels/user-label';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
// import { Progress } from '@/components/ui/progress';
import { type ActionsRow, assessmentActionsRows } from '@/dummy-data/actions';
import { cn } from '@/lib/utils';
import { ActionsDataTable } from './actions-data-table';
import { hierarchicalFilterFn } from './row-functions';

// import DueDatesOverview from './due-dates-overview-cell';

const getActionsColumns = (
  onOpenComments: () => void
): ColumnDef<ActionsRow>[] => [
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
    filterFn: hierarchicalFilterFn,
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
    id: 'date',
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
    size: 7.5,
    maxSize: 7.5,
    header: 'Resource',
  },
  {
    size: 7.5,
    maxSize: 7.5,
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
          <div className="flex items-center justify-end gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="float-right size-7"
                    size="icon"
                    variant="outline"
                  >
                    <HugeiconsIcon icon={Edit04Icon} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit action</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="relative float-right size-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenComments();
                    }}
                    size="icon"
                    variant="outline"
                  >
                    <HugeiconsIcon icon={Comment01Icon} />
                    <div className="-top-1.5 -right-1.5 absolute flex size-3.5 items-center justify-center rounded-full bg-red-500 font-bold text-white text-xs">
                      3
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View comments</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      }
    },
  },
];

export default function Actions() {
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);

  const actionsColumns = getActionsColumns(() => {
    setCommentsOpen(true);
  });

  return (
    <div className="flex size-full flex-col gap-4 p-4">
      <Sheet onOpenChange={setCommentsOpen} open={commentsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Comments</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <ActionsDataTable columns={actionsColumns} data={assessmentActionsRows} />
    </div>
  );
}
