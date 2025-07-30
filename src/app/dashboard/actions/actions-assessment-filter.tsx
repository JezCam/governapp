'use client';

import { useSearchParams } from 'next/navigation';
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
import type { DataTableFilterProps } from '../../../components/data-table/types';

export default function ActionsAssessmentFilter(props: DataTableFilterProps) {
  const searchParams = useSearchParams();
  const assessmentParam = searchParams.get('assessment');

  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (assessmentParam && !value) {
      props.onChange(assessmentParam);
      setValue(assessmentParam);
    }
  }, []);

  return (
    <Select onValueChange={props.onChange} value={value}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select assessment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Assessment</SelectLabel>
          {assessmentActionsRows.map((row) => (
            <SelectItem key={row.assessment.id} value={row.assessment.id}>
              <span className="font-medium">{row.assessment.name}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
