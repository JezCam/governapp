'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { assessmentActionsRows } from '@/dummy-data/actions';
import type { DataTableFilterProps } from './types';

export default function ActionsAssessmentFilter(props: DataTableFilterProps) {
  const [value, setValue] = useState<string>(props.value || '');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <Select onValueChange={props.onChange} value={value}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select assessment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Assessment</SelectLabel>
          {assessmentActionsRows.map((row) => (
            <SelectItem key={row.id} value={row.name}>
              {row.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
