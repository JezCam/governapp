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
import { assessmentStatuses } from '@/dummy-data/assessments';
import StatusLabel from '../../labels/status-label';
import type { DataTableFilterProps } from '../types';

export default function AssessmentsStatusFilter(props: DataTableFilterProps) {
  const [value, setValue] = useState<string>(props.value || '');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <Select onValueChange={props.onChange} value={value}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {assessmentStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              <StatusLabel status={status} />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
