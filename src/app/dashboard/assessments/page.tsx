'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  File01Icon,
  MoreHorizontalIcon,
  ZapIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import type { ColumnDef } from '@tanstack/react-table';
import { useQuery } from 'convex/react';
import Link from 'next/link';
import { useState } from 'react';
import AssessmentsStatusFilter from '@/app/dashboard/assessments/assessments-status-filter';
import { DataTable } from '@/components/data-table/data-table';
import AssessmentDetailsDialog from '@/components/dialogs/assessment-details-dialog';
import CreateSelfAssessmentDialog from '@/components/dialogs/create-self-assessment-dialog';
import NewAssessmentDialog from '@/components/dialogs/new-assessment-dialog';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/lib/utils';
import type { AssessmentTableRow } from '@/types/convex';
import { api } from '../../../../convex/_generated/api';

const getAssessmentColumns = (
  onOpenDetails: (assessment: AssessmentTableRow) => void
): ColumnDef<AssessmentTableRow>[] => [
  {
    size: 10,
    maxSize: 10,
    accessorKey: 'type',
    header: ({ column }) => <SortButton column={column}>Type</SortButton>,
    cell: ({ row }) => {
      return <Badge variant={row.original.type} />;
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
      return formatDateTime(new Date(dueDate).getTime());
    },
  },
  {
    size: 25,
    maxSize: 25,
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const {
        currentUserAssessment,
        status: assessmentStatus,
        _id: assessmentId,
      } = row.original;
      const userAssessmentStatus = currentUserAssessment.status;

      switch ([assessmentStatus, userAssessmentStatus].join(',')) {
        case 'not-started,not-started':
        case 'in-progress,not-started':
          return (
            <Button asChild size="sm" variant="outline">
              <Link
                href={`/dashboard/assessments/${currentUserAssessment._id}`}
              >
                Start assessment
              </Link>
            </Button>
          );
        case 'in-progress,in-progress':
          return (
            <Button asChild size="sm" variant="secondary">
              <Link
                href={`/dashboard/assessments/${currentUserAssessment._id}`}
              >
                Continue assessment
              </Link>
            </Button>
          );
        case 'in-progress,completed':
          return 'All done! Waiting on your team...';
        case 'completed,completed':
        case 'completed,in-progress':
        case 'completed,not-started':
          return (
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link
                  className="flex gap-2"
                  href={`/dashboard/reports?assessment=${assessmentId}`}
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
                  href={`/dashboard/actions?assessment=${assessmentId}`}
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
        onClick={() => onOpenDetails(row.original)}
        size="icon"
        variant="outline"
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} />
      </Button>
    ),
  },
];

export default function Assessments() {
  const assessments = useQuery(
    api.services.assessments.listForActiveOrganisation
  );
  const isAdmin = useQuery(api.services.users.isAdminOfActiveOrganisation);

  const [createSelfAssessmentOpen, setCreateSelfAssessmentOpen] =
    useState(false);
  const [newAssessmentOpen, setNewAssessmentOpen] = useState(false);
  const [detailsAssessment, setDetailsAssessment] =
    useState<AssessmentTableRow>();

  const columns = getAssessmentColumns((assessment) => {
    setDetailsAssessment(assessment);
  });

  if (assessments === undefined || isAdmin === undefined) {
    return null; // TODO: Implement loading state
  }

  return (
    <div className="max-w-[1440px] p-4">
      {/* For non admin user */}
      <CreateSelfAssessmentDialog
        onOpenChange={setCreateSelfAssessmentOpen}
        open={createSelfAssessmentOpen}
      />
      <NewAssessmentDialog
        onOpenChange={setNewAssessmentOpen}
        open={newAssessmentOpen}
      />
      {detailsAssessment && (
        <AssessmentDetailsDialog
          assessment={detailsAssessment}
          isAdmin={isAdmin}
          onOpenChange={(open) => {
            if (!open) {
              setDetailsAssessment(undefined);
            }
          }}
          open={true}
        />
      )}
      <DataTable
        actionOnClick={() => {
          if (isAdmin) {
            setNewAssessmentOpen(true);
          } else {
            setCreateSelfAssessmentOpen(true);
          }
        }}
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
