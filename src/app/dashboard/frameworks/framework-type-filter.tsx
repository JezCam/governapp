'use client';

import { useEffect, useState } from 'react';
import type { DataTableFilterProps } from '@/components/data-table/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function FrameworkTypeFilter(props: DataTableFilterProps) {
  const [value, setValue] = useState<string>(props.value || '');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <Select onValueChange={props.onChange} value={value}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Framework type</SelectLabel>
          <SelectItem key="self" value="self">
            Self
          </SelectItem>
          <SelectItem key="board" value="board">
            Board
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
