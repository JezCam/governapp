'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  CheckmarkCircle03Icon,
  DashedLineCircleIcon,
  Progress03Icon,
} from '@hugeicons-pro/core-stroke-rounded';
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
import type { DataTableFilterProps } from './types';

export default function AssessmentStatusFilter(props: DataTableFilterProps) {
  const [value, setValue] = useState<string>(props.value || '');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <Select onValueChange={props.onChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="not-started">
            <HugeiconsIcon
              className="text-gray-600"
              icon={DashedLineCircleIcon}
              strokeWidth={2}
            />
            Not started
          </SelectItem>
          <SelectItem value="in-progress">
            <HugeiconsIcon className="text-amber-600" icon={Progress03Icon} />
            In progress
          </SelectItem>
          <SelectItem value="closed">
            <HugeiconsIcon
              className="text-ga-green-600"
              icon={CheckmarkCircle03Icon}
              strokeWidth={2}
            />
            Closed
          </SelectItem>
          <SelectItem value="completed">
            <HugeiconsIcon
              className="text-ga-green-600"
              icon={CheckmarkCircle03Icon}
              strokeWidth={2}
            />
            Completed
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
