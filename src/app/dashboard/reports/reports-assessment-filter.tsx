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
import type { Assessment } from '@/types/convex';

export default function ActionsAssessmentFilter({
  assessments,
  value,
  onChange,
}: DataTableFilterProps & { assessments: Assessment[] }) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select assessment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Assessment</SelectLabel>
          {assessments.map((assessment) => (
            <SelectItem key={assessment._id} value={assessment._id}>
              <span className="font-medium">{assessment.name}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
