import type { Row, Table } from '@tanstack/react-table';
import type { ActionsRow } from '@/dummy-data/actions';
import { type TeamMember, teamMembers } from '@/dummy-data/team';
import { categoriseDueDate } from '@/lib/utils';

export const getTotal = (rows: Row<ActionsRow>[]) => {
  let total = 0;
  const countRows = (_rows: Row<ActionsRow>[]) => {
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

export const getStatusOverview = (row: Row<ActionsRow>) => {
  let total = 0;
  let completed = 0;
  let inProgress = 0;
  const countProgress = (_row: Row<ActionsRow>) => {
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

export const getDueDatesOverview = (row: Row<ActionsRow>) => {
  let total = 0;
  let overdue = 0;
  let soon = 0;
  const countDueDates = (_row: Row<ActionsRow>) => {
    if (_row.depth === 2) {
      total++;
      const dueDate = _row.getValue('date');
      const { category } = categoriseDueDate(dueDate as Date);
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

export const getAssigneesOverview = (row: Row<ActionsRow>) => {
  const assignees: TeamMember[] = [];
  const collectAssignees = (_row: Row<ActionsRow>) => {
    if (_row.depth === 2) {
      const assignee = teamMembers.find(
        (teamMember) => teamMember.userId === _row.getValue('assignee')
      );
      if (assignee && !assignees.some((a) => a.userId === assignee.userId)) {
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

export const expandToDepth = (table: Table<ActionsRow>, depth: number) => {
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
  row: Row<ActionsRow>,
  columnId: string,
  filterValue: unknown
) => {
  const checkRowAndParents = (currentRow: Row<ActionsRow>): boolean => {
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

export const getRowRiskBackground = (row: Row<ActionsRow>) => {
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
