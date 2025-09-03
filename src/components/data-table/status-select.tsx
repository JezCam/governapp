'use client';

import type * as SelectPrimitive from '@radix-ui/react-select';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { actionStatuses } from '../../../convex/schemas/actions';
import StatusLabel from '../labels/status-label';

export default function StatusSelect(
  props: React.ComponentProps<typeof SelectPrimitive.Root>
) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {actionStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              <StatusLabel status={status} />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
