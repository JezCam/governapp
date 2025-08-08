'use client';

import type { DataTableFilterProps } from '@/components/data-table/types';
// import UserLabel from '@/components/labels/user-label';
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

export default function ActionsAssigneeFilter({
  value,
  onChange,
}: DataTableFilterProps) {
  return (
    <Select onValueChange={onChange} value={value}>
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
              {/* <UserLabel user={teamMember} /> */}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
