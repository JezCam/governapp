'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useQuery } from 'convex/react';
import { Suspense } from 'react';
import ExpandChevron from '@/components/expand-chevron';
import FrameworkLabel from '@/components/labels/framework-label';
import SortButton from '@/components/sort-button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { api } from '../../../../convex/_generated/api';
import type { ReportRow } from '../../../../convex/services/assessments';
import { ReportsDataTable } from './reports-data-table';
import { hierarchicalFilterFn } from './reports-row-functions';
import Score from './score';

const columns: ColumnDef<ReportRow>[] = [
  {
    id: 'first',
    size: 35,
    maxSize: 35,
    accessorFn: (row) => {
      switch (row.rowLevel) {
        case 'assessment':
          return row.name;
        case 'domain':
          return row.domain.name;
        case 'section':
          return row.section.name;
        case 'question':
          return row.question.text;
        default:
      }
    },
    filterFn: (row, _, filterValue) => {
      switch (row.original.rowLevel) {
        case 'assessment':
          return row.original._id === filterValue;
        case 'domain':
        case 'section':
        case 'question':
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
        case 'domain':
          return (
            <div className="flex min-h-11 items-center gap-2">
              <ExpandChevron
                className="mt-0.75 ml-6 shrink-0"
                expanded={row.getIsExpanded()}
              />
              <FrameworkLabel
                name={row.original.domain.name}
                variant="domain"
              />
            </div>
          );
        case 'section':
          return (
            <div className="flex min-h-11 items-center gap-2">
              <ExpandChevron
                className="mt-0.75 ml-12 shrink-0"
                expanded={row.getIsExpanded()}
              />
              <FrameworkLabel
                name={row.original.section.name}
                variant="section"
              />
            </div>
          );
        case 'question': {
          const expanded = row.getIsExpanded();

          return (
            <div className={cn('flex w-full gap-2', expanded ? 'mt-3' : '')}>
              <ExpandChevron
                className="mt-0.5 ml-18 shrink-0"
                expanded={expanded}
              />
              <span
                className={cn(
                  'whitespace-pre-wrap font-medium',
                  expanded ? '' : 'line-clamp-1 truncate'
                )}
              >
                {row.original.question.text}
              </span>
            </div>
          );
        }
        default:
      }
    },
  },
  {
    id: 'score',
    size: 15,
    maxSize: 15,
    accessorFn: (row) => {
      switch (row.rowLevel) {
        case 'question':
          return;
        default:
          return row.calculatedScore;
      }
    },
    header: ({ column }) => <SortButton column={column}>Score</SortButton>,
    cell: ({ row }) => {
      switch (row.original.rowLevel) {
        case 'question':
          return null;
        default:
          return (
            <div className="flex min-h-11 items-center">
              <Score
                value={row.original.calculatedScore}
                variant={row.original.rowLevel}
              />
            </div>
          );
      }
    },
  },
  {
    id: 'risk',
    accessorFn: (row) => {
      if (row.rowLevel === 'assessment') {
        return row.risk;
      }
    },
    filterFn: hierarchicalFilterFn,
    size: 10,
    maxSize: 10,
    header: ({ column }) => <SortButton column={column}>Risk</SortButton>,
    cell: ({ row }) => (
      <div className="flex min-h-11 items-center">
        <Badge variant={row.original.risk} />
      </div>
    ),
  },
  {
    size: 40,
    maxSize: 40,
    accessorKey: 'feedback',
    header: 'Feedback',
    cell: ({ row }) => (
      <div
        className={cn(
          'whitespace-pre-wrap',
          row.getIsExpanded() ? 'mt-3 mb-3' : 'line-clamp-1'
        )}
      >
        {row.original.feedback}
      </div>
    ),
  },
];

export default function Reports() {
  const reportRows = useQuery(api.services.assessments.listReportRows);

  if (reportRows === undefined) {
    return null; // TODO: Add a skeleton loader
  }

  return (
    <div className="size-full p-4">
      <Suspense>
        <ReportsDataTable columns={columns} data={reportRows} />
      </Suspense>
    </div>
  );
}
