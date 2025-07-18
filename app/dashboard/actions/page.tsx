'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Hexagon01Icon } from '@hugeicons-pro/core-solid-rounded';
import { Edit04Icon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { CornerDownLeft } from 'lucide-react';
import { useState } from 'react';
import DueDateLabel from '@/app/dashboard/actions/due-date';
import ExpandChevron from '@/components/expand-chevron';
import EditActionForm from '@/components/forms/edit-action-form';
import UserLabel from '@/components/labels/user-label';
import { LoadingButton } from '@/components/loading-button';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
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
import { hierarchicalFilterFn } from './row-functions';

const getActionsColumns = (
  onEditAction: (action: ActionsRowAction) => void
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
        const assignee = row.original.assignee;
        return (
          <div className="flex h-7 items-center">
            <UserLabel user={assignee} />
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
                    className="float-right size-7"
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
                <TooltipContent>Update action</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      }
    },
  },
];

export default function Actions() {
  const [editAction, setEditAction] = useState<ActionsRowAction>();

  const actionsColumns = getActionsColumns((action: ActionsRowAction) => {
    setEditAction(action);
  });

  return (
    <div className="flex size-full flex-col gap-4 p-4">
      <Sheet
        modal={false}
        onOpenChange={(open) => {
          if (!open) {
            setEditAction(undefined);
          }
        }}
        open={!!editAction}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update Action</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col gap-4 px-4 pb-4">
            <EditActionForm />
            <Separator className="mt-2" />
            <h2 className="font-bold">Progress updates</h2>
            <div className="h-full" />
            <div className="flex flex-col items-end gap-2">
              <Textarea
                className="field-sizing-content max-h-40 min-h-20 resize-none py-1.75 pb-6"
                placeholder="Add a progress update"
              />
              <LoadingButton className="w-fit">
                Post <CornerDownLeft />
              </LoadingButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <ActionsDataTable columns={actionsColumns} data={assessmentActionsRows} />
    </div>
  );
}
