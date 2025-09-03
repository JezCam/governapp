'use client';

import type * as SelectPrimitive from '@radix-ui/react-select';
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
import { risks } from '../../../convex/schemas/frameworks';

export default function RiskSelect(
  props: React.ComponentProps<typeof SelectPrimitive.Root>
) {
  return (
    <Select {...props}>
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
