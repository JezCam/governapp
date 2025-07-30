'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  File01Icon,
  MoreHorizontalIcon,
  ZapIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useState } from 'react';
import AssessmentsStatusFilter from '@/app/dashboard/assessments/assessments-status-filter';
import { DataTable } from '@/components/data-table/data-table';
import AssessmentDetailsDialog from '@/components/dialogs/assessment-details-dialog';
import NewAssessmentDialog from '@/components/dialogs/new-assessment-dialog';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Assessment, assessments } from '@/dummy-data/assessments';
import { formatDateTime } from '@/lib/utils';

const getAssessmentColumns = (
  onOpenDetails: (assessment: Assessment) => void
): ColumnDef<Assessment>[] => [
  {
    size: 10,
    maxSize: 10,
    accessorKey: 'type',
    header: ({ column }) => <SortButton column={column}>Type</SortButton>,
    cell: ({ row }) => {
      const type = row.original.type;
      return <Badge variant={type} />;
    },
  },
  {
    size: 30,
    maxSize: 30,
    accessorKey: 'name',
    header: ({ column }) => <SortButton column={column}>Name</SortButton>,
    cell: ({ row }) => {
      const name = row.original.name;
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    size: 15,
    maxSize: 15,
    accessorKey: 'status',
    header: ({ column }) => <SortButton column={column}>Status</SortButton>,
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={status} />;
    },
  },
  {
    size: 20,
    maxSize: 20,
    accessorKey: 'dueDate',
    header: ({ column }) => <SortButton column={column}>Due Date</SortButton>,
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      return formatDateTime(dueDate.getTime());
    },
  },
  {
    size: 25,
    maxSize: 25,
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const id = row.original.id;
      const status = row.original.status;

      switch (status) {
        case 'not-started':
          return (
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard/assessments/123">Start assessment</Link>
            </Button>
          );
        case 'in-progress':
          return (
            <Button asChild size="sm" variant="secondary">
              <Link href="/dashboard/assessments/123">Continue assessment</Link>
            </Button>
          );
        case 'completed':
        case 'closed':
          return (
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link
                  className="flex gap-2"
                  href={`/dashboard/reports?assessment=${id}`}
                >
                  <HugeiconsIcon
                    className="text-muted-foreground"
                    icon={File01Icon}
                    strokeWidth={2}
                  />
                  Report
                </Link>
              </Button>
              <Button asChild className="!pl-2" size="sm" variant="outline">
                <Link
                  className="flex gap-1"
                  href={`/dashboard/actions?assessment=${id}`}
                >
                  <HugeiconsIcon
                    className="text-primary"
                    icon={ZapIcon}
                    strokeWidth={2}
                  />
                  Actions
                </Link>
              </Button>
            </div>
          );
        default:
      }
    },
  },
  {
    id: 'menu',
    cell: ({ row }) => (
      <Button
        className="float-right size-8"
        onClick={() => onOpenDetails(row.original as Assessment)}
        size="icon"
        variant="outline"
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} />
      </Button>
    ),
  },
];

export default function Assessments() {
  const [newAssessmentOpen, setNewAssessmentOpen] = useState(false);
  const [detailsAssessment, setDetailsAssessment] = useState<Assessment>();

  const columns = getAssessmentColumns((assessment) => {
    setDetailsAssessment(assessment);
  });

  return (
    <div className="size-full p-4">
      <NewAssessmentDialog
        onOpenChange={setNewAssessmentOpen}
        open={newAssessmentOpen}
      />
      {detailsAssessment && (
        <AssessmentDetailsDialog
          assessment={detailsAssessment}
          onOpenChange={(open) => {
            if (!open) {
              setDetailsAssessment(undefined);
            }
          }}
          open={true}
        />
      )}
      <DataTable
        actionOnClick={() => setNewAssessmentOpen(true)}
        actionText="Create new assessment"
        columns={columns}
        data={assessments}
        filters={[
          {
            columnKey: 'status',
            Filter: AssessmentsStatusFilter,
          },
        ]}
        hasMenu
        minWidth="1200px"
        searchable
        searchPlaceholder="Search for an assessment"
        title="Assessments"
      />
    </div>
  );
}
