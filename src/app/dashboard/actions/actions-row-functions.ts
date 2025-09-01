import type { Row, Table } from '@tanstack/react-table';
import { categoriseDueDate } from '@/lib/utils';
import type { User } from '@/types/convex';
import type { ActionRow } from '../../../../convex/services/assessments';

export const getTotal = (rows: Row<ActionRow>[]) => {
  let total = 0;
  const countRows = (_rows: Row<ActionRow>[]) => {
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

export const getStatusOverview = (row: Row<ActionRow>) => {
  let total = 0;
  let completed = 0;
  let inProgress = 0;
  const countProgress = (_row: Row<ActionRow>) => {
    if (_row.depth === 2) {
      total++;
      if (_row.getValue('status') === 'completed') {
        completed++;
      }
      if (_row.getValue('status') === 'in-progress') {
        inProgress++;
      }
    }
    if (_row.subRows && _row.subRows.length > 0) {
      for (const subRow of _row.subRows) {
        countProgress(subRow);
      }
    }
  };
  countProgress(row);
  return { total, completed, inProgress };
};

export const getDueDatesOverview = (row: Row<ActionRow>) => {
  let total = 0;
  let overdue = 0;
  let soon = 0;
  const countDueDates = (_row: Row<ActionRow>) => {
    if (_row.original.rowLevel === 'action') {
      total++;
      const dueDate = new Date(_row.original.dueDate);
      const { category } = categoriseDueDate(dueDate);
      if (category === 'overdue') {
        overdue++;
      } else if (category === 'soon') {
        soon++;
      }
    }
    if (_row.subRows && _row.subRows.length > 0) {
      for (const subRow of _row.subRows) {
        countDueDates(subRow);
      }
    }
  };
  countDueDates(row);
  return { total, overdue, soon };
};

export const getAssigneesOverview = (row: Row<ActionRow>) => {
  const assignees: User[] = [];
  const collectAssignees = (_row: Row<ActionRow>) => {
    if (_row.original.rowLevel === 'action') {
      const assignee = _row.original.assignee;
      if (assignee && !assignees.some((a) => a._id === assignee._id)) {
        assignees.push(assignee);
      }
    }
    if (_row.subRows && _row.subRows.length > 0) {
      for (const subRow of _row.subRows) {
        collectAssignees(subRow);
      }
    }
  };
  collectAssignees(row);
  return assignees;
};

export const expandToDepth = (table: Table<ActionRow>, depth: number) => {
  const toggleRow = (row: Row<ActionRow>) => {
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
  row: Row<ActionRow>,
  columnId: string,
  filterValue: unknown
) => {
  // Only apply filter logic to leaf nodes (depth 2 - actions)
  if (row.depth !== 2) {
    return false; // Skip filtering for non-leaf nodes
  }

  const checkRowAndParents = (currentRow: Row<ActionRow>): boolean => {
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

export const getRowRiskBackground = (row: Row<ActionRow>) => {
  let risk: string | undefined;
  if (row.depth === 0) {
    return 'bg-background';
  }
  if (row.depth === 1) {
    risk = row.getValue('first');
  }
  if (row.depth === 2) {
    const parentRow = row.getParentRow();
    risk = parentRow ? parentRow.getValue('first') : 'none';
  }
  if (risk === 'black') {
    return 'bg-gray-100 dark:bg-gray-800';
  }
  if (risk === 'red') {
    return 'bg-red-50 dark:bg-red-950/50';
  }
  if (risk === 'amber') {
    return 'bg-amber-50 dark:bg-amber-950/50';
  }
  if (risk === 'green') {
    return 'bg-green-50 dark:bg-green-950/50';
  }
  return 'bg-background';
};
