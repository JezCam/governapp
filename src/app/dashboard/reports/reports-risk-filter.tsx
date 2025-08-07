'use client';

import { useEffect, useState } from 'react';
import type { DataTableFilterProps } from '@/components/data-table/types';
import RiskLabel from '@/components/labels/risk-label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { risks } from '@/dummy-data/risk';

export default function ReportsRiskFilter(props: DataTableFilterProps) {
  const [value, setValue] = useState<string>(props.value || '');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <Select onValueChange={props.onChange} value={value}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select risk" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {risks.map((risk) => (
            <SelectItem key={risk} value={risk}>
              <RiskLabel risk={risk} />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
