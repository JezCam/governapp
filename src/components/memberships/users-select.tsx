'use client';

import type * as SelectPrimitive from '@radix-ui/react-select';
import { useQuery } from 'convex/react';
import { cn } from '@/lib/utils';
import { api } from '../../../convex/_generated/api';
import UserLabel from '../labels/user-label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function UsersSelect(
  props: React.ComponentProps<typeof SelectPrimitive.Root> & {
    className?: string;
  }
) {
  const team = useQuery(
    api.services.memberships.listInActiveOrganisationWithUsers
  );

  if (team === undefined) {
    return null; // TODO: Add a skeleton loader
  }

  const users = team.map((member) => member.user);

  return (
    <Select {...props}>
      <SelectTrigger className={cn('w-fit', props.className)}>
        <SelectValue placeholder="Select assginee" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Assignee</SelectLabel>
          {users.map((user) => (
            <SelectItem className="gap-1.5" key={user._id} value={user._id}>
              <UserLabel user={user} />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
