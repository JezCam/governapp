'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  title,
  actionText,
  actionOnClick,
  columns,
  data,
}: DataTableProps<TData, TValue> & {
  title?: string;
  actionText?: string;
  actionOnClick?: () => void;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-xl border bg-accent">
      <div className="flex items-center justify-between border-b bg-background px-3 py-3">
        <div className="flex items-center gap-2">
          <h2 className="font-medium text-base">{title ?? 'Data'}</h2>
          <Badge className="rounded-sm px-1.5" variant="blue">
            {data.length}
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
                    <TableHead key={header.id}>
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
                    'group border-none [&>td]:bg-background [&>td]:px-3 [&>td]:last:border-l-0 [&>td]:group-hover:bg-blue-50 dark:[&>td]:group-hover:bg-blue-950/50',
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
  );
}
