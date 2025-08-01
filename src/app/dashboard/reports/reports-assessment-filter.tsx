import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { assessmentReportsRows } from '@/dummy-data/reports';
import type { DataTableFilterProps } from '../../../components/data-table/types';

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
          {assessmentReportsRows.map((row) => (
            <SelectItem key={row.assessment.id} value={row.assessment.id}>
              <span className="font-medium">{row.assessment.name}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
