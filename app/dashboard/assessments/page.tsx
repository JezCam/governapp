"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { MoreHorizontalIcon } from "@hugeicons-pro/core-stroke-rounded";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import AssessmentsStatusFilter from "@/app/dashboard/assessments/assessments-status-filter";
import { DataTable } from "@/components/data-table/data-table";
import AssessmentDetailsDialog from "@/components/dialogs/assessment-details-dialog";
import NewAssessmentDialog from "@/components/dialogs/new-assessment-dialog";
import SortButton from "@/components/sort-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Assessment, assessments } from "@/dummy-data/assessments";
import { formatDateTime } from "@/lib/utils";

const getAssessmentColumns = (
  onOpenDetails: (assessment: Assessment) => void
): ColumnDef<Assessment>[] => [
  {
    size: 10,
    maxSize: 10,
    accessorKey: "type",
    header: ({ column }) => <SortButton column={column}>Type</SortButton>,
    cell: ({ row }) => {
      const type = row.original.type;
      return <Badge className="" variant={type} />;
    },
  },
  {
    size: 30,
    maxSize: 30,
    accessorKey: "name",
    header: ({ column }) => <SortButton column={column}>Name</SortButton>,
    cell: ({ row }) => {
      const name = row.original.name;
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    size: 15,
    maxSize: 15,
    accessorKey: "status",
    header: ({ column }) => <SortButton column={column}>Status</SortButton>,
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={status} />;
    },
  },
  {
    size: 20,
    maxSize: 20,
    accessorKey: "dueDate",
    header: ({ column }) => <SortButton column={column}>Due Date</SortButton>,
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      return formatDateTime(dueDate.getTime());
    },
  },
  {
    size: 25,
    maxSize: 25,
    id: "actions",
    header: "Actions",
    cell: () => (
      <Button size="sm" variant="outline">
        Start assessment
      </Button>
    ),
  },
  {
    id: "menu",
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
    <>
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
      <div className="flex size-full flex-col gap-4 overflow-auto p-4">
        <DataTable
          actionOnClick={() => setNewAssessmentOpen(true)}
          actionText="Create new assessment"
          columns={columns}
          data={assessments}
          filters={[
            {
              columnKey: "status",
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
    </>
  );
}
