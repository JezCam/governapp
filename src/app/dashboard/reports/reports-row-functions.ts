import type { Row, Table } from '@tanstack/react-table';
import type { ReportRow } from '../../../../convex/services/assessments';

export const getTotal = (rows: Row<ReportRow>[]) => {
  let total = 0;
  const countRows = (_rows: Row<ReportRow>[]) => {
    for (const row of _rows) {
      if (row.depth === 3) {
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

export const expandToDepth = (table: Table<ReportRow>, depth: number) => {
  const toggleRow = (row: Row<ReportRow>) => {
    if (row.depth >= depth) {
      return; // Skip rows that are deeper than the specified depth
    }
    if (!row.getIsExpanded()) {
      row.toggleExpanded(true); // Expand the current row
    }
    // Recursively expand subRows if they exist
    if (row.subRows && row.subRows.length > 0) {
      for (const subRow of row.subRows) {
        toggleRow(subRow);
      }
    }
  };

  for (const row of table.getCoreRowModel().rows) {
    toggleRow(row);
  }
};

// Custom hierarchical filter function
export const hierarchicalFilterFn = (
  row: Row<ReportRow>,
  columnId: string,
  filterValue: unknown
) => {
  const checkRowAndParents = (currentRow: Row<ReportRow>): boolean => {
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
