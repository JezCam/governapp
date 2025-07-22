import type { Row, Table } from '@tanstack/react-table';
import type { ReportsRow } from '@/dummy-data/reports';

export const getTotal = (rows: Row<ReportsRow>[]) => {
  let total = 0;
  const countRows = (_rows: Row<ReportsRow>[]) => {
    for (const row of _rows) {
      if (row.depth === 2) {
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

export const expandToDepth = (table: Table<ReportsRow>, depth: number) => {
  for (const row of table.getRowModel().rows) {
    if (row.depth <= depth) {
      row.toggleExpanded(true);
    }
    if (depth > 0) {
      for (const subRow of row.subRows) {
        subRow.toggleExpanded(true);
      }
    }
  }
};

// Custom hierarchical filter function
export const hierarchicalFilterFn = (
  row: Row<ReportsRow>,
  columnId: string,
  filterValue: unknown
) => {
  const checkRowAndParents = (currentRow: Row<ReportsRow>): boolean => {
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
