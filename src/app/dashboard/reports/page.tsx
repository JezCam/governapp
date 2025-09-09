'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useQuery } from 'convex/react';
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
    size: 70,
    maxSize: 70,
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
            <div className="flex items-center gap-2">
              <ExpandChevron
                className="mt-0.75 ml-3 shrink-0"
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
            <div className="flex items-center gap-2">
              <ExpandChevron
                className="mt-0.75 ml-6 shrink-0"
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
          const questionNumber = row.original.questionNumber;
          const responseOptions = row.original.responseOptions;
          const selectedOptionId = row.original.nearestResponseOptionId;

          return (
            <div
              className={cn(
                'flex w-full gap-2',
                expanded && row.original.rowLevel !== 'question' ? 'mt-3' : ''
              )}
            >
              <ExpandChevron
                className="mt-0.5 ml-9 shrink-0"
                expanded={expanded}
              />
              <div className="flex w-full flex-col gap-4">
                <span
                  className={cn(
                    'whitespace-pre-wrap font-medium',
                    expanded ? '' : 'line-clamp-1 truncate'
                  )}
                >
                  <div className="mr-2 mb-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border bg-background align-middle text-xs">
                    {questionNumber}
                  </div>
                  {row.original.question.text}
                </span>
                {expanded && (
                  <ul className="flex w-full list-disc flex-col gap-2">
                    {responseOptions.map((option) => (
                      <li
                        className={cn(
                          'whitespace-pre-wrap px-2 py-1 text-muted-foreground',
                          option._id === selectedOptionId
                            ? 'rounded-md border bg-background font-medium text-foreground'
                            : ''
                        )}
                        key={option._id}
                      >
                        {option.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        }
        default:
      }
    },
  },
  {
    id: 'score',
    size: 20,
    maxSize: 20,
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
            <div
              className={cn(
                'flex min-h-5.5 items-center',
                row.original.rowLevel === 'assessment' ? 'min-h-11' : ''
              )}
            >
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
    accessorKey: 'risk',
    filterFn: hierarchicalFilterFn,
    size: 10,
    maxSize: 10,
    header: ({ column }) => <SortButton column={column}>Risk</SortButton>,
    cell: ({ row }) => (
      <div
        className={cn(
          'flex items-center',
          row.original.rowLevel === 'assessment' ? 'min-h-11' : ''
        )}
      >
        <Badge variant={row.original.risk} />
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
      <ReportsDataTable columns={columns} data={reportRows} />
    </div>
  );
}
