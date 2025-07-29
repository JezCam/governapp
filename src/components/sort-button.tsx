import type { Column } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import SortIndicator from './sort-indicator';
import { Button } from './ui/button';

export default function SortButton<TData>({
  children,
  column,
}: {
  children?: ReactNode;
  column: Column<TData, unknown>;
}) {
  return (
    <Button
      className="gap-1.5 p-0 hover:bg-transparent"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      variant="ghost"
    >
      {children}
      <SortIndicator sort={column.getIsSorted()} />
    </Button>
  );
}
