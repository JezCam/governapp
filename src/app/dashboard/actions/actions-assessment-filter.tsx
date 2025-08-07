import type { DataTableFilterProps } from '@/components/data-table/types';
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

export default function ActionsAssessmentFilter({
  value,
  onChange,
}: DataTableFilterProps) {
  return (
    <Select onValueChange={onChange} value={value}>
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
