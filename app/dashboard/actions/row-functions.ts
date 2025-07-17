import type { Row, Table } from '@tanstack/react-table';
import type { ActionsRow } from '@/dummy-data/actions';

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

export const getProgressOverview = (row: Row<ActionsRow>) => {
  let total = 0;
  let completed = 0;
  const countProgress = (_row: Row<ActionsRow>) => {
    if (_row.depth === 2) {
      total++;
      if (_row.getValue('progress') === 'completed') {
        completed++;
      }
    }
    if (_row.subRows && _row.subRows.length > 0) {
      for (const subRow of _row.subRows) {
        countProgress(subRow);
      }
    }
  };
  countProgress(row);
  return { total, completed };
};

export const expandAllParentRows = (table: Table<ActionsRow>) => {
  for (const row of table.getRowModel().rows) {
    row.toggleExpanded(true);
    for (const subRow of row.subRows) {
      subRow.toggleExpanded(true);
    }
  }
};
