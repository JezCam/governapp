'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Comment01Icon, Edit04Icon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { Suspense, useState } from 'react';
import DueDateLabel from '@/app/dashboard/actions/due-date';
import EditActionDialog from '@/components/dialogs/edit-action-dialog';
import ExpandChevron from '@/components/expand-chevron';
import FrameworkLabel from '@/components/labels/framework-label';
// import UserLabel from '@/components/labels/user-label'; TODO: Implement
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  type ActionsRow,
  type ActionsRowAction,
  assessmentActionsRows,
} from '@/dummy-data/actions';
import { cn } from '@/lib/utils';
import { ActionsDataTable } from './actions-data-table';
import ProgressUpdatesSheet from './progress-updates-sheet';

const getActionsColumns = (
  onOpenProgressUpdates: (action: ActionsRowAction) => void,
  onEditAction: (action: ActionsRowAction) => void
): ColumnDef<ActionsRow>[] => [
  {
    id: 'first',
    size: 40,
    maxSize: 40,
    accessorFn: (row) => {
      switch (row.type) {
        case 'assessment':
          return row.assessment.name;
        case 'risk':
          return row.risk;
        case 'action':
          return row.text;
        default:
      }
    },
    filterFn: (row, _, filterValue) => {
      switch (row.original.type) {
        case 'assessment':
          return row.original.assessment.id === filterValue;
        case 'risk':
        case 'action':
          return row.original.assessmentId === filterValue;
        default:
          return false;
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
                  {row.original.assessment.name}
                </span>
                <FrameworkLabel
                  name={row.original.assessment.framework}
                  variant="framework"
                />
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
        case 'action': {
          const expanded = row.getIsExpanded();

          return (
            <div className="flex w-full gap-2">
              <ExpandChevron
                className="mt-0.5 ml-12 shrink-0"
                expanded={expanded}
              />
              <span
                className={cn(
                  'whitespace-pre-wrap font-medium',
                  expanded ? '' : 'line-clamp-1 truncate'
                )}
              >
                {row.original.text}
              </span>
            </div>
          );
        }
        default:
      }
    },
  },
  {
    size: 15,
    maxSize: 15,
    id: 'status',
    accessorFn: (row) => {
      if (row.type === 'action') {
        return row.status;
      }
      return null;
    },
    header: ({ column }) => <SortButton column={column}>Status</SortButton>,
    cell: ({ row }) => {
      if (row.original.type === 'action') {
        return (
          <div className="flex h-7 items-center">
            <Badge variant={row.original.status} />
          </div>
        );
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
        return (
          <div className="flex h-7 items-center">
            <DueDateLabel dueDate={dueDate} />
          </div>
        );
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
        // const assignee = row.original.assignee;
        return (
          <div className="flex h-7 items-center">
            {/* <UserLabel user={assignee} /> */}
          </div>
        );
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
                    className="relative float-right size-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditAction(row.original as ActionsRowAction);
                    }}
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
                      onOpenProgressUpdates(row.original as ActionsRowAction);
                    }}
                    size="icon"
                    variant="outline"
                  >
                    <HugeiconsIcon icon={Comment01Icon} />
                    <div className="-top-1.5 -right-1.5 absolute flex size-4 items-center justify-center rounded-full bg-red-500 font-bold text-white text-xs">
                      5
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Progress updates</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      }
    },
  },
];

export default function Actions() {
  const [progressUpdatesAction, setProgressUpdatesAction] =
    useState<ActionsRowAction>();
  const [editAction, setEditAction] = useState<ActionsRowAction>();

  const actionsColumns = getActionsColumns(
    (action: ActionsRowAction) => setProgressUpdatesAction(action),
    (action: ActionsRowAction) => setEditAction(action)
  );

  return (
    <div className="size-full p-4">
      <ProgressUpdatesSheet
        modal={false}
        onOpenChange={(open) => {
          if (!open) {
            setProgressUpdatesAction(undefined);
          }
        }}
        open={!!progressUpdatesAction}
      />
      <EditActionDialog
        action={editAction}
        onOpenChange={(open) => {
          if (!open) {
            setEditAction(undefined);
          }
        }}
        open={!!editAction}
      />

      <Suspense>
        <ActionsDataTable
          columns={actionsColumns}
          data={assessmentActionsRows}
        />
      </Suspense>
    </div>
  );
}
