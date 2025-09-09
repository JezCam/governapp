'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Comment01Icon, Edit04Icon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useQuery } from 'convex/react';
import { useState } from 'react';
import DueDateLabel from '@/app/dashboard/actions/due-date';
import EditActionDialog from '@/components/dialogs/edit-action-dialog';
import ExpandChevron from '@/components/expand-chevron';
import FrameworkLabel from '@/components/labels/framework-label';
import UserLabel from '@/components/labels/user-label';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import UserAvatarStack from '@/components/ui/user-avatar-stack';
import { cn } from '@/lib/utils';
import { api } from '../../../../convex/_generated/api';
import type {
  ActionRow,
  ActionRowAction,
} from '../../../../convex/services/assessments';
import { ActionsDataTable } from './actions-data-table';
import {
  getAssigneesOverview,
  getDueDatesOverview,
  getStatusOverview,
} from './actions-row-functions';
import DueDatesOverview from './due-dates-overview';
import ProgressUpdatesSheet from './progress-updates-sheet';
import StatusOverview from './status-overview';

const getActionsColumns = (
  onOpenProgressUpdates: (action: ActionRowAction) => void,
  onEditAction: (action: ActionRowAction) => void
): ColumnDef<ActionRow>[] => [
  {
    id: 'first',
    size: 40,
    maxSize: 40,
    accessorFn: (row) => {
      switch (row.rowLevel) {
        case 'assessment':
          return row.name;
        case 'risk':
          return row.risk;
        case 'action':
          return row.text;
        default:
      }
    },
    filterFn: (row, _, filterValue) => {
      switch (row.original.rowLevel) {
        case 'assessment':
          return row.original._id === filterValue;
        case 'risk':
        case 'action':
          return row.original.assessmentId === filterValue;
        default:
          return false;
      }
    },
    header: undefined,
    cell: ({ row }) => {
      switch (row.original.rowLevel) {
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
                <FrameworkLabel
                  name={row.original.framework.name}
                  variant="framework"
                />
              </div>
            </div>
          );
        case 'risk':
          return (
            <div className="flex items-center gap-2">
              <ExpandChevron className="ml-3" expanded={row.getIsExpanded()} />
              <Badge variant={row.original.risk} />
            </div>
          );
        case 'action': {
          const expanded = row.getIsExpanded();

          return (
            <div className={cn('flex w-full gap-2', expanded ? 'my-1' : '')}>
              <ExpandChevron
                className="mt-0.5 ml-6 shrink-0"
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
    size: 13,
    maxSize: 13,
    id: 'status',
    accessorFn: (row) => {
      if (row.rowLevel === 'action') {
        return row.status;
      }
      return null;
    },
    header: ({ column }) => <SortButton column={column}>Status</SortButton>,
    cell: ({ row }) => {
      if (row.original.rowLevel === 'action') {
        return (
          <div className="flex h-7 items-center">
            <Badge variant={row.original.status} />
          </div>
        );
      }
      return <StatusOverview {...getStatusOverview(row)} />;
    },
  },
  {
    id: 'date',
    size: 13,
    maxSize: 13,
    accessorKey: 'dueDate',
    header: ({ column }) => <SortButton column={column}>Due Date</SortButton>,
    cell: ({ row }) => {
      if (row.original.rowLevel === 'action') {
        const dueDate = new Date(row.original.dueDate);
        return (
          <div className="flex h-7 items-center">
            <DueDateLabel dueDate={dueDate} />
          </div>
        );
      }
      return <DueDatesOverview {...getDueDatesOverview(row)} />;
    },
  },
  {
    size: 19,
    maxSize: 19,
    id: 'assignee',
    header: 'Assignee/s',
    accessorKey: 'assignee._id',
    cell: ({ row }) => {
      if (row.original.rowLevel === 'action') {
        const assignee = row.original.assignee;
        return (
          <div className="flex h-7 items-center">
            <UserLabel user={assignee} />
          </div>
        );
      }
      return <UserAvatarStack size={28} users={getAssigneesOverview(row)} />;
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
      switch (row.original.rowLevel) {
        case 'action':
          return (
            <div className="flex items-center justify-end gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="relative float-right h-7 w-fit gap-1 px-1.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProgressUpdates(row.original as ActionRowAction);
                      }}
                      size="icon"
                      variant="outline"
                    >
                      {row.original.numComments > 0 && (
                        <div className="flex items-center justify-center px-0.5 font-semibold text-ga-blue-500 text-xs dark:text-ga-blue-200">
                          {row.original.numComments}
                        </div>
                      )}
                      <HugeiconsIcon icon={Comment01Icon} strokeWidth={1.8} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Progress updates</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="relative float-right size-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditAction(row.original as ActionRowAction);
                      }}
                      size="icon"
                      variant="outline"
                    >
                      <HugeiconsIcon icon={Edit04Icon} strokeWidth={1.8} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit action</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        default:
      }
    },
  },
];

export default function Actions() {
  const actionRows = useQuery(api.services.assessments.listActionRows);

  const [progressUpdatesAction, setProgressUpdatesAction] =
    useState<ActionRowAction>();
  const [editAction, setEditAction] = useState<ActionRowAction>();

  const actionsColumns = getActionsColumns(
    setProgressUpdatesAction,
    setEditAction
  );

  if (actionRows === undefined) {
    return null; // TODO: Add a skeleton loader
  }

  return (
    <div className="size-full p-4">
      <ProgressUpdatesSheet
        actionId={progressUpdatesAction?._id}
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
      <ActionsDataTable columns={actionsColumns} data={actionRows} />
    </div>
  );
}
