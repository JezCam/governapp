"use client";

import type { ColumnDef } from "@tanstack/react-table";
import ExpandChevron from "@/components/expand-chevron";
import FrameworkLabel from "@/components/labels/framework-label";
import SortButton from "@/components/sort-button";
import { Badge } from "@/components/ui/badge";
import { assessmentReportsRows, type ReportsRow } from "@/dummy-data/reports";
import { cn } from "@/lib/utils";
import { ReportsDataTable } from "./reports-data-table";
import { hierarchicalFilterFn } from "./reports-row-functions";
import Score from "./score";

const columns: ColumnDef<ReportsRow>[] = [
  {
    id: "first",
    size: 35,
    maxSize: 35,
    accessorFn: (row) => {
      switch (row.type) {
        case "assessment":
          return row.name;
        case "domain":
          return row.name;
        case "section":
          return row.name;
        case "question":
          return row.text;
        default:
      }
    },
    filterFn: hierarchicalFilterFn,
    header: undefined,
    cell: ({ row }) => {
      switch (row.original.type) {
        case "assessment":
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
                <FrameworkLabel framework={row.original.framework} />
              </div>
            </div>
          );
        case "domain":
          return (
            <div className="flex gap-2">
              <ExpandChevron
                className="mt-0.75 ml-6 shrink-0"
                expanded={row.getIsExpanded()}
              />
              <span className="line-clamp-1 truncate font-medium">
                {row.original.name}
              </span>
            </div>
          );
        case "section":
          return (
            <div className="flex gap-2">
              <ExpandChevron
                className="mt-0.75 ml-12 shrink-0"
                expanded={row.getIsExpanded()}
              />
              <span className="line-clamp-1 truncate font-medium">
                {row.original.name}
              </span>
            </div>
          );
        case "question": {
          const expanded = row.getIsExpanded();

          return (
            <div className="flex w-full gap-2">
              <ExpandChevron
                className="mt-0.5 ml-18 shrink-0"
                expanded={expanded}
              />
              <span
                className={cn(
                  "whitespace-pre-wrap font-medium",
                  expanded ? "" : "line-clamp-1 truncate"
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
    id: "score",
    size: 15,
    maxSize: 15,
    accessorFn: (row) => {
      switch (row.type) {
        case "assessment":
          return row.score;
        case "domain":
          return row.score;
        case "section":
          return row.score;
        default:
      }
    },
    header: ({ column }) => <SortButton column={column}>Score</SortButton>,
    cell: ({ row }) => {
      switch (row.original.type) {
        case "assessment":
          return <Score value={row.original.score} variant="assessment" />;
        case "domain":
          return <Score value={row.original.score} variant="domain" />;
        case "section":
          return <Score value={row.original.score} variant="section" />;
        default:
      }
    },
  },
  {
    id: "risk",
    accessorFn: (row) => {
      if (row.type === "assessment") {
        return row.risk;
      }
    },
    filterFn: hierarchicalFilterFn,
    size: 10,
    maxSize: 10,
    header: ({ column }) => <SortButton column={column}>Risk</SortButton>,
    cell: ({ row }) => <Badge variant={row.original.risk} />,
  },
  {
    size: 40,
    maxSize: 40,
    accessorKey: "feedback",
    header: "Feedback",
  },
];

export default function Reports() {
  return (
    <div className="size-full p-4">
      <ReportsDataTable columns={columns} data={assessmentReportsRows} />
    </div>
  );
}
