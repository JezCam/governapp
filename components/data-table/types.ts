import type { ComponentType } from 'react';

export type DataTableFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export type DataTableFilters = {
  columnKey: string;
  Filter: ComponentType<DataTableFilterProps>;
}[];
