'use client';

import { useEffect, useState } from 'react';
import type { DataTableFilterProps } from '@/components/data-table/types';
import UserLabel from '@/components/labels/user-label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { teamMembers } from '@/dummy-data/team';

export default function ActionsAssigneeFilter(props: DataTableFilterProps) {
  const [value, setValue] = useState<string>(props.value || '');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <Select onValueChange={props.onChange} value={value}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select assginee" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Assignee</SelectLabel>
          {teamMembers.map((teamMember) => (
            <SelectItem
              className="gap-1.5"
              key={teamMember.userId}
              value={teamMember.userId}
            >
              <UserLabel user={teamMember} />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
