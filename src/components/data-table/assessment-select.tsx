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
import type { Assessment } from '@/types/convex';

export default function AssessmentSelect({
  assessments,
  ...rest
}: React.ComponentProps<typeof SelectPrimitive.Root> & {
  assessments: Assessment[];
}) {
  return (
    <Select {...rest}>
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
