'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import ExpandChevron from '@/components/expand-chevron';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { type ActionsRow, assessmentActionsRows } from '@/dummy-data/actions';

const columns: ColumnDef<ActionsRow>[] = [
  {
    accessorKey: 'name',
    header: () => <span className="font-medium">Name</span>,
    cell: ({ row }) => {
      if (row.original.type === 'assessment') {
        return (
          <div className="flex items-center gap-2">
            <ExpandChevron expanded={row.getIsExpanded()} />
            <span className="font-medium">{row.original.name}</span>
          </div>
        );
      }
      if (row.original.type === 'risk') {
        return (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ExpandChevron className="ml-6" expanded={row.getIsExpanded()} />
              <Badge variant={row.original.risk} />
            </div>
            <Badge className="rounded-sm px-1.5" variant="actions">
              {row.original.subRows.length}
            </Badge>
          </div>
        );
      }
      if (row.original.type === 'action') {
        return (
          <div className="flex items-center gap-2">
            <ExpandChevron className="ml-12" expanded={row.getIsExpanded()} />
            <span className="font-medium">
              {row.original.text}
              {row.getIsExpanded() ? "I'm expanded woohoo!" : ''}
            </span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      if (row.original.type === 'assessment') {
        const { total, completed } = row.original.progressSummary;
        return (
          <div className="flex items-center gap-2">
            <Progress value={(completed / total) * 100} />
            <span className="font-medium text-xs">
              {`${completed}/${total}`}
            </span>
          </div>
        );
      }
      if (row.original.type === 'risk') {
        const { total, completed } = row.original.progressSummary;
        return (
          <div className="flex items-center gap-2">
            <Progress value={(completed / total) * 100} />
            <span className="font-medium text-xs">
              {`${completed}/${total}`}
            </span>
          </div>
        );
      }
      if (row.original.type === 'action') {
        return <Badge variant={row.original.status} />;
      }
    },
  },
  {
    header: 'Due Date',
  },
  { header: 'Assignee/s' },
  {
    header: 'Resource',
  },
  {
    id: 'menu',
  },
];

export default function Actions() {
  return (
    <div className="flex size-full flex-col gap-4 p-4">
      <DataTable
        columns={columns}
        data={assessmentActionsRows}
        searchable
        searchPlaceholder="Search for an assessment"
        title="Actions"
        total={8}
        totalVariant="actions"
      />
    </div>
  );
}
