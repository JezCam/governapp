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
  total?: number; // Total number of items, used for display purposes
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
  total,
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // needed for client-side global filtering
    globalFilterFn: 'includesString', // built-in filter function
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

  const renderedFilters = filters?.map((filter) => {
    const column = table.getColumn(filter.columnKey);
    if (!column) {
      return null;
    }
    return (
      <div key={filter.columnKey}>
        {filter.component({
          onChange: (value) => column.setFilterValue(value),
          value: column.getFilterValue() as string,
        })}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-4">
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
      <div className="overflow-hidden rounded-xl border bg-accent">
        <div className="flex items-center justify-between border-b bg-background px-3 py-3">
          <div className="flex w-full items-center gap-3">
            <h2 className="font-semibold text-base">{title}</h2>
            <Badge className="rounded-sm px-1.5" variant={totalVariant}>
              {total ?? data.length}
            </Badge>
          </div>
          {actionText && (
            <Button onClick={actionOnClick} size="sm">
              {actionText}
            </Button>
          )}
        </div>
        <div className="px-2 pb-2">
          <Table className="border-separate border-spacing-0">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  className="border-none [&>th]:border-l [&>th]:px-3 [&>th]:first:border-l-0 [&>th]:last:border-l-0"
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className="text-muted-foreground"
                        key={header.id}
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
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
    </div>
  );
}
