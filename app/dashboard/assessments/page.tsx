'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import NewAssessmentDialog from '@/components/dialogs/new-assessment-dialog';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Assessment, assessments } from '@/dummy-data/assessments';
import { formatDateTime } from '@/lib/utils';
import { assessmentDataTableContext } from './context';
import StatusFilter from './status-filter';

const columns: ColumnDef<Assessment>[] = [
  {
    accessorKey: 'type',
    header: ({ column }) => <SortButton column={column}>Type</SortButton>,
    cell: ({ row }) => {
      const type = row.original.type;
      return <Badge className="" variant={type} />;
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <SortButton column={column}>Name</SortButton>,
    cell: ({ row }) => {
      const name = row.original.name;
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortButton column={column}>Status</SortButton>,
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={status} />;
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => <SortButton column={column}>Due Date</SortButton>,
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      return formatDateTime(dueDate.getTime());
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => <Button variant="outline">Start assessment</Button>,
  },
  {
    id: 'menu',
    cell: () => (
      <Button className="float-right size-7" size="icon" variant="outline">
        <HugeiconsIcon icon={MoreHorizontalIcon} />
      </Button>
    ),
  },
];

export default function Assessments() {
  const [newAssessmentOpen, setNewAssessmentOpen] = useState(false);

  return (
    <>
      <NewAssessmentDialog
        onOpenChange={setNewAssessmentOpen}
        open={newAssessmentOpen}
      />
      <div className="flex size-full flex-col gap-4 p-4">
        <DataTable
          actionOnClick={() => setNewAssessmentOpen(true)}
          actionText="Create new assessment"
          columns={columns}
          context={assessmentDataTableContext}
          data={assessments}
          searchable
          searchPlaceholder="Search for an assessment"
          title="Assessments"
        >
          {/* Filters can be added here */}
          <StatusFilter />
        </DataTable>
      </div>
    </>
  );
}
