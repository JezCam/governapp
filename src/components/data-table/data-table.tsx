'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon } from '@hugeicons-pro/core-stroke-rounded';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { SearchIcon, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';
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
  minWidth?: string; // Minimum width for the table
  className?: string; // Additional classes for the table container
  actionText?: string;
  actionOnClick?: () => void;
  hasMenu?: boolean;
  searchable?: boolean; // If true, shows the search input
  searchPlaceholder?: string; // Placeholder for the search input
  filters?: DataTableFilters; // Filters to be applied to the table
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  title = 'Data',
  minWidth,
  className,
  actionText,
  actionOnClick,
  hasMenu,
  searchable,
  searchPlaceholder = 'Search...',
  filters,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here
  const [sorting, setSorting] = useState<SortingState>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const table = useReactTable({
    filterFromLeafRows: true, // Ensure that the filter function applies to leaf rows
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // needed for client-side global filtering
    globalFilterFn: 'includesString',
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      columnFilters,
      sorting,
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

    return (
      <Filter
        key={columnKey}
        onChange={(value) => column.setFilterValue(value)}
        value={column.getFilterValue() as string}
      />
    );
  });

  return (
    <div className={cn('flex flex-col', className)}>
      {(searchable || filters) && (
        <div className="mb-4 flex items-center gap-2">
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
            <Button
              disabled={!columnFilters.length}
              onClick={() => setColumnFilters([])}
              variant="outline"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
      <div className="flex h-fit max-h-full flex-col overflow-hidden rounded-xl border bg-accent">
        <div className="flex items-center justify-between rounded-t-xl border-b bg-background px-3 py-3">
          <div className="flex w-full items-center gap-3">
            <h2 className="font-semibold text-base">{title}</h2>
            <Badge variant="blue">{data.length}</Badge>
          </div>
          {actionText && (
            <Button onClick={actionOnClick} size="sm">
              {actionText}
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
            </Button>
          )}
        </div>
        <Table
          className={cn(
            'h-full table-fixed border-separate border-spacing-0 pb-2 pl-2',
            hasMenu ? '' : 'pr-2'
          )}
          style={{ minWidth }}
        >
          <TableHeader className="sticky top-0 z-10 bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className={cn(
                  '[&>th]:border-l [&>th]:px-3 [&>th]:first:border-l-0',
                  hasMenu ? '[&>th]:last:border-l-0' : ''
                )}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn(
                        'text-muted-foreground',
                        hasMenu ? 'last:!w-14 ' : ''
                      )}
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
                    'group relative border-none [&>td]:bg-background [&>td]:px-3 [&>td]:group-hover:bg-blue-50 dark:[&>td]:group-hover:bg-blue-950/50',
                    // Table Cell Borders
                    '[&>td]:border-b [&>td]:border-l [&>td]:not-first:[border-left-style:_dashed]',
                    hasMenu
                      ? '[&>td]:nth-last-2:border-r'
                      : '[&>td]:last:border-r',
                    // hasMenu
                    hasMenu
                      ? '[&>td]:last:!bg-transparent [&>td]:last:border-none'
                      : '',
                    // First Row
                    'first:[&>td]:border-t',
                    // Bottom Right
                    hasMenu
                      ? 'last:[&>td]:nth-last-2:rounded-br-md'
                      : 'last:[&>td]:last:rounded-br-md',
                    // Bottom Left
                    'last:[&>td]:first:rounded-bl-md',
                    // Top Right
                    hasMenu
                      ? 'first:[&>td]:nth-last-2:rounded-tr-md'
                      : 'first:[&>td]:last:rounded-tr-md',
                    // Top Left
                    'first:[&>td]:first:rounded-tl-md'
                  )}
                  data-state={row.getIsSelected() && 'selected'}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={cn(
                        hasMenu ? 'last:sticky last:right-0' : '',
                        row.depth === 2 && row.getIsExpanded()
                          ? 'content-start'
                          : ''
                      )}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
