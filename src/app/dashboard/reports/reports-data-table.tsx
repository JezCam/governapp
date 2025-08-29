'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Download04Icon, ZapIcon } from '@hugeicons-pro/core-stroke-rounded';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { SearchIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { type ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type {
  ReportRow,
  ReportRowAssessment,
} from '../../../../convex/services/assessments';
import ReportsAssessmentFilter from './reports-assessment-filter';
import ReportsRiskFilter from './reports-risk-filter';
import {
  expandToDepth,
  getTotal,
  hierarchicalFilterFn,
} from './reports-row-functions';

interface ReportsDataTableProps {
  children?: ReactNode;
  columns: ColumnDef<ReportRow>[];
  data: ReportRowAssessment[];
}

export function ReportsDataTable({ columns, data }: ReportsDataTableProps) {
  const searchParams = useSearchParams();
  const assessmentParam = searchParams.get('assessment');

  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>(
    assessmentParam ?? ''
  );

  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    ...(selectedAssessmentId
      ? [{ id: 'first', value: selectedAssessmentId }]
      : []),
  ]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const inputRef = useRef<HTMLInputElement>(null);

  const table = useReactTable({
    filterFromLeafRows: true, // Ensure that the filter function applies to leaf rows
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // needed for client-side global filtering
    globalFilterFn: hierarchicalFilterFn, // Use our custom filter function
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: (row) => (row.rowLevel === 'question' ? [] : row.subRows),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      globalFilter,
      columnFilters,
      sorting,
      expanded,
    },
  });

  const handleClearInput = () => {
    table.setGlobalFilter('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onAssessmentChange = (value: string) => {
    setSelectedAssessmentId(value);
    table.getColumn('first')?.setFilterValue(value);
    if (value) {
      expandToDepth(table, 1);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    onAssessmentChange(assessmentParam ?? '');
  }, [assessmentParam]);

  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-xs">
          <Input
            className="peer ps-9"
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder="Search reports"
            ref={inputRef}
            type="text"
            value={globalFilter ?? ''}
          />
          {globalFilter && (
            <Button
              aria-label="Clear input"
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:bg-transparent hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleClearInput}
              size="icon"
              variant="ghost"
            >
              <XIcon aria-hidden="true" size={16} />
            </Button>
          )}
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
        </div>
        <Suspense>
          <ReportsAssessmentFilter
            onChange={onAssessmentChange}
            value={selectedAssessmentId}
          />
        </Suspense>
        <ReportsRiskFilter
          onChange={(value) => {
            table.getColumn('risk')?.setFilterValue(value);
          }}
          value={(table.getColumn('risk')?.getFilterValue() as string) ?? ''}
        />
        <Button
          disabled={!columnFilters.length}
          onClick={() => {
            setSelectedAssessmentId('');
            setColumnFilters([]);
            setExpanded({});
          }}
          variant="outline"
        >
          Clear filters
        </Button>
      </div>
      <div className="flex h-fit max-h-full flex-col overflow-hidden rounded-xl border bg-accent">
        <div className="flex items-center justify-between rounded-t-xl border-b bg-background px-3 py-3">
          <div className="flex w-full items-center gap-3">
            <h2 className="font-semibold text-base">Reports</h2>
            <Badge variant="blue">{data.length}</Badge>
          </div>
          {columnFilters.find((filter) => filter.id === 'first') && (
            <div className="flex gap-2">
              <Button asChild className="!pl-2" size="sm" variant="outline">
                <Link
                  className="flex gap-1"
                  href={`/dashboard/actions/?assessment=${columnFilters[0].value}`}
                >
                  <HugeiconsIcon
                    className="text-primary"
                    icon={ZapIcon}
                    strokeWidth={2}
                  />
                  Actions
                </Link>
              </Button>
              <Button size="sm" variant="secondary">
                Download PDF
                <HugeiconsIcon icon={Download04Icon} strokeWidth={2} />
              </Button>
            </div>
          )}
        </div>
        <Table className="relative h-full min-w-[1200px] table-fixed border-separate border-spacing-0 overflow-auto px-2 pb-2">
          <TableHeader className="sticky top-0 z-10 bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="[&>th]:border-l [&>th]:px-3 [&>th]:first:border-l-0"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-muted-foreground"
                      key={header.id}
                      style={{ width: `${header.getSize()}%` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={cn(
                    'group [&>td]:group-hover:!bg-blue-50 dark:[&>td]:group-hover:!bg-blue-950/50 border-none [&>td]:px-3',
                    // Table Cell Borders
                    '[&>td]:border-b [&>td]:border-l [&>td]:not-first:[border-left-style:_dashed] [&>td]:last:border-r',
                    // First Row
                    'first:[&>td]:border-t',
                    // Bottom Right
                    'last:[&>td]:last:rounded-br-md',
                    // Bottom Left
                    'last:[&>td]:first:rounded-bl-md',
                    // Top Right
                    'first:[&>td]:last:rounded-tr-md',
                    // Top Left
                    'first:[&>td]:first:rounded-tl-md'
                  )}
                  data-state={row.getIsSelected() && 'selected'}
                  key={row.id}
                  onClick={() => row.toggleExpanded()}
                >
                  {/** biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation> */}
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      className={cn(
                        'relative',
                        row.original.rowLevel === 'assessment'
                          ? 'bg-background'
                          : '',
                        row.original.rowLevel === 'domain'
                          ? 'bg-ga-blue-50 dark:bg-ga-blue-950'
                          : '',
                        row.original.rowLevel === 'section'
                          ? 'bg-ga-green-50 dark:bg-ga-green-950'
                          : '',
                        row.original.rowLevel === 'question' ? 'bg-accent' : '',
                        row.depth === 3 && row.getIsExpanded()
                          ? 'content-start'
                          : ''
                      )}
                      key={cell.id}
                    >
                      {index === 0 && !!row.subRows.length ? (
                        <div className="flex items-center justify-between">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                          <Badge
                            variant={((type) => {
                              switch (type) {
                                case 'assessment':
                                  return 'domain';
                                case 'domain':
                                  return 'section';
                                case 'section':
                                  return 'question';
                                case 'question':
                                  return 'secondary';
                                default:
                              }
                            })(row.original.rowLevel)}
                          >
                            {getTotal(row.subRows)}
                          </Badge>
                        </div>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
