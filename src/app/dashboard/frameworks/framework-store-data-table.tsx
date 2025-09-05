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
import { Fragment, useRef, useState } from 'react';
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
import type { Framework } from '@/types/convex';
import FrameworkTypeFilter from './framework-type-filter';

interface FrameworkStoreDataTableProps {
  columns: ColumnDef<Framework>[];
  data: Framework[];
}

export function FrameworksStoreDataTable({
  columns,
  data,
}: FrameworkStoreDataTableProps) {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

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
    onExpandedChange: setExpanded,
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

  return (
    <div className="flex size-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <div className="relative w-full max-w-xs">
          <Input
            className="peer ps-9"
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder={'Search frameworks'}
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
        <FrameworkTypeFilter
          onChange={(value) => {
            table.getColumn('type')?.setFilterValue(value);
          }}
          value={(table.getColumn('type')?.getFilterValue() as string) ?? ''}
        />
        <Button
          disabled={!columnFilters.length}
          onClick={() => setColumnFilters([])}
          variant="outline"
        >
          Clear filters
        </Button>
      </div>
      <div className="flex h-fit flex-col rounded-xl border bg-accent">
        <div className="flex items-center justify-between rounded-t-xl border-b bg-background px-3 py-3">
          <div className="flex w-full items-center gap-3">
            <h2 className="font-semibold text-base">Available Frameworks</h2>
            <Badge variant="blue">{data.length}</Badge>
          </div>
        </div>
        <Table className="h-full table-fixed border-separate border-spacing-0 px-2 pb-2">
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
          <TableBody
            className={cn(
              '[&_td]:bg-background [&_td]:px-3 [&_td]:group-hover:bg-ga-purple-50 dark:[&_td]:group-hover:bg-ga-purple-950/50',
              // Table Cell Borders
              '[&_td]:border-b [&_td]:border-l [&_td]:not-first:[border-left-style:_dashed] [&_td]:last:border-r',
              // First Row
              '[&>tr]:first:[&_td]:border-t',
              // Bottom Right
              '[&>tr]:last:[&_td]:last:rounded-br-md',
              // Bottom Left
              '[&>tr]:last:[&_td]:first:rounded-bl-md',
              // Top Right
              '[&>tr]:first:[&_td]:last:rounded-tr-md',
              // Top Left
              '[&>tr]:first:[&>td]:first:rounded-tl-md'
            )}
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    className="group relative border-none"
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
                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell
                        className="!bg-accent whitespace-pre-wrap border border-t-0 py-3 pr-3 pl-9"
                        colSpan={5}
                      >
                        {row.original.description}
                        {row.original.description}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
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
