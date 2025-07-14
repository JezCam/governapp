'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import ExpandChevron from '@/components/expand-chevron';
import { Badge } from '@/components/ui/badge';
import { type ActionsRow, assessmentActionsRows } from '@/dummy-data/actions';

const columns: ColumnDef<ActionsRow>[] = [
  {
    accessorKey: 'name',
    header: () => <span className="font-medium">Name</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.type === 'assessment' && (
          <div className="flex items-center gap-2">
            <ExpandChevron expanded={row.getIsExpanded()} />
            <span className="font-medium">{row.original.name}</span>
          </div>
        )}
        {row.original.type === 'risk' && (
          <div className="flex items-center gap-2">
            <ExpandChevron className="ml-6" expanded={row.getIsExpanded()} />
            <Badge variant={row.original.risk} />
          </div>
        )}
        {row.original.type === 'action' && (
          <div className="flex items-center gap-2">
            <ExpandChevron className="ml-12" expanded={row.getIsExpanded()} />
            <span className="font-medium">
              {row.original.text}
              {row.getIsExpanded() ? "I'm expanded woohoo!" : ''}
            </span>
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
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
      />
    </div>
  );
}
