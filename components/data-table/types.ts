import type { ReactNode } from 'react';

export type DataTableFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export type DataTableFilter = (props: DataTableFilterProps) => ReactNode;

export type DataTableFilters = {
  columnKey: string;
  component: DataTableFilter;
}[];
