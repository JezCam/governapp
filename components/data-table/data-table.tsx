'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { SearchIcon, XIcon } from 'lucide-react';
import { type ReactNode, useRef, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import type { DataTableFilters } from './types';

interface DataTableProps<TData, TValue> {
  title?: string;
  totalDepth?: number; // Depth of the hierarchy for the total count
  totalVariant?: 'blue' | 'actions' | 'outline';
  actionText?: string;
  actionOnClick?: () => void;
  searchable?: boolean; // If true, shows the search input
  searchPlaceholder?: string; // Placeholder for the search input
  filters?: DataTableFilters; // Filters to be applied to the table
  children?: ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  title = 'Data',
  totalDepth = 0,
  totalVariant = 'blue',
  actionText,
  actionOnClick,
  searchable,
  searchPlaceholder = 'Search...',
  filters,
  columns,
  data,
}: DataTableProps<TData, TValue> & {}) {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const inputRef = useRef<HTMLInputElement>(null);

  // Custom hierarchical filter function
  const hierarchicalFilterFn = (
    row: Row<TData>,
    columnId: string,
    filterValue: unknown
  ) => {
    const checkRowAndParents = (currentRow: Row<TData>): boolean => {
      // Check if current row matches the filter
      const cellValue = currentRow.getValue(columnId);
      const rowMatches = String(cellValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());

      const parentRows = currentRow.getParentRows();

      // If current row matches, include it and expand its parents
      if (rowMatches) {
        for (const parentRow of parentRows) {
          parentRow.toggleExpanded(true); // Expand parent rows
        }
        return true;
      }

      // Check parent rows recursively
      if (parentRows.length > 0) {
        return parentRows.some((parentRow) => checkRowAndParents(parentRow));
      }

      return false;
    };

    return checkRowAndParents(row);
  };

  const getTotal = (rows: Row<TData>[]) => {
    if (totalDepth === 0) {
      return rows.length;
    }

    let total = 0;
    const countRows = (_rows: Row<TData>[]) => {
      for (const row of _rows) {
        if (row.depth === totalDepth) {
          total++;
        }
        if (row.subRows && row.subRows.length > 0) {
          countRows(row.subRows);
        }
      }
    };
    countRows(rows);

    return total;
  };

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
    getSubRows: (row) => (row as { subRows: [] })?.subRows,
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

  const renderedFilters = filters?.map(({ columnKey, Filter }) => {
    const column = table.getColumn(columnKey);
    if (!column) {
      return null;
    }

    // Apply the hierarchical filter function to this column
    column.columnDef.filterFn = hierarchicalFilterFn;

    return (
      <Filter
        key={columnKey}
        onChange={(value) => column.setFilterValue(value)}
        value={column.getFilterValue() as string}
      />
    );
  });

  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex items-center gap-2">
        {searchable && (
          <div className="relative w-full max-w-xs">
            <Input
              className="peer ps-9"
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              placeholder={searchPlaceholder}
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
        )}
        {renderedFilters}
        {filters && (
          <Button onClick={() => setColumnFilters([])} variant="outline">
            Clear filters
          </Button>
        )}
      </div>
      <div className="flex h-fit max-h-full flex-col overflow-hidden rounded-xl border bg-accent">
        <div className="flex items-center justify-between rounded-t-xl border-b bg-background px-3 py-3">
          <div className="flex w-full items-center gap-3">
            <h2 className="font-semibold text-base">{title}</h2>
            <Badge className="px-1.5" variant={totalVariant}>
              {getTotal(table.getFilteredRowModel().rows)}
            </Badge>
          </div>
          {actionText && (
            <Button onClick={actionOnClick} size="sm">
              {actionText}
            </Button>
          )}
        </div>
        <Table className="relative h-full table-fixed border-separate border-spacing-0 overflow-auto px-2 pb-2">
          <TableHeader className="sticky top-0 z-10 bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="[&>th]:border-l [&>th]:px-3 [&>th]:first:border-l-0 [&>th]:last:border-l-0"
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
                    'group [&>td]:group-hover:!bg-blue-50 dark:[&>td]:group-hover:!bg-blue-950/50 border-none [&>td]:bg-background [&>td]:px-3 [&>td]:last:border-l-0',
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
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      className={cn(
                        'relative',
                        row.depth === 2 && row.getIsExpanded()
                          ? 'content-start'
                          : ''
                      )}
                      key={cell.id}
                    >
                      {!!totalDepth && index === 0 && !!row.subRows.length ? (
                        <div className="flex items-center justify-between">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                          <Badge variant="actions">
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
