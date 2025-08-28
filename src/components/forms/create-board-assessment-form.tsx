/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { zodResolver } from '@hookform/resolvers/zod';
import { parseDate, today } from '@internationalized/date';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import type { Domain, Framework } from '@/types/convex';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';
import DatePicker from '../date-picker';
import { Checkbox } from '../ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import UserMultiSelect from '../user-multiselect';
import FormButtons from './form-buttons';
import type { FormProps } from './types';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Assessment name is required')
    .min(2, 'Assessment name must contain at least 2 characters')
    .max(50, 'Assessment name cannot exceed 50 characters'),
  frameworkId: z.string().min(1, 'Please select a framework'),
  selectedDomainIds: z.array(z.string()).min(1, {
    message: 'Please select at least one domain',
  }),
  participantsUserIds: z.array(z.string()).min(1, {
    message: 'You must select at least one participant',
  }),
  startDate: z.string({ message: 'Please select a start date' }),
  dueDate: z.string({ message: 'Please select a due date' }),
});

export default function CreateBoardAssessmentForm(props: FormProps) {
  const memberships = useQuery(
    api.services.memberships.listInActiveOrganisationWithUsers
  );
  const subscribedBoardFrameworks = useQuery(
    api.services.frameworks.listSubscribedByTypeWithDomains,
    { type: 'board' }
  );
  const createAssessment = useMutation(api.services.assessments.create);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<
    Framework & { domains: Domain[] }
  >();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      frameworkId: '',
      selectedDomainIds: [],
      participantsUserIds: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const name = values.name.trim();
    const frameworkId = values.frameworkId as Id<'frameworks'>;
    const selectedDomainIds = values.selectedDomainIds as Id<'domains'>[];
    const participantsUserIds = values.participantsUserIds as Id<'users'>[];
    const questionsTotal = selectedDomainIds.reduce((total, domainId) => {
      const domain = selectedFramework?.domains.find((d) => d._id === domainId);
      return total + (domain?.questionsTotal || 0);
    }, 0);
    const startDate = parseDate(values.startDate)
      .toDate('Australia/Sydney')
      .getTime();
    const dueDate = parseDate(values.dueDate)
      .toDate('Australia/Sydney')
      .getTime();

    createAssessment({
      name,
      frameworkId,
      selectedDomainIds,
      participantsUserIds,
      questionsTotal,
      startDate,
      dueDate,
    })
      .then(() => {
        toast.success('Assessment created successfully');
        props.onSuccess?.();
      })
      .catch(() => {
        toast.error('Failed to create assessment');
      })
      .finally(() => setIsLoading(false));
  }

  if (subscribedBoardFrameworks === undefined || memberships === undefined) {
    return null; // TODO: Add loading state
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-1 flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assessment Name</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    className="pe-14"
                    maxLength={50}
                    placeholder="Create a name for your board assessment"
                    {...field}
                  />
                </FormControl>
                <output
                  aria-live="polite"
                  className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground text-xs tabular-nums peer-disabled:opacity-50"
                >
                  {field.value.length}/50
                </output>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="frameworkId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Framework</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={(value) => {
                  const framework = subscribedBoardFrameworks.find(
                    (f) => f._id === value
                  );
                  setSelectedFramework(framework);
                  form.setValue('selectedDomainIds', []);
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a framework" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subscribedBoardFrameworks.map((framework) => (
                    <SelectItem key={framework._id} value={framework._id}>
                      {framework.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedFramework && (
          <FormField
            control={form.control}
            name="selectedDomainIds"
            render={() => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel>Domains</FormLabel>
                </div>
                {selectedFramework.domains.map((domain) => (
                  <FormField
                    control={form.control}
                    key={domain._id}
                    name="selectedDomainIds"
                    render={({ field }) => (
                      <FormItem
                        className="flex flex-row items-start space-x-1 space-y-0"
                        key={domain._id}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(domain._id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, domain._id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== domain._id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">
                          {domain.name}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="participantsUserIds"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Participants</FormLabel>
              <FormControl>
                <UserMultiSelect
                  defaultOptions={memberships.map((membership) => ({
                    user: membership.user,
                  }))}
                  emptyIndicator={
                    <p className="text-center text-sm">No users found</p>
                  }
                  inputProps={{
                    'aria-invalid': fieldState.invalid,
                  }}
                  onChange={(value) =>
                    field.onChange(value.map((v) => v.user._id))
                  }
                  placeholder="Select users"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2.5">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="w-fit">Start Date</FormLabel>
                <DatePicker
                  error={fieldState.invalid}
                  // Disable dates before today and after the due date
                  isDateUnavailable={(date) =>
                    date.compare(today('UTC')) < 0 ||
                    (!!form.getValues('dueDate') &&
                      date.compare(parseDate(form.getValues('dueDate'))) > 0)
                  }
                  onChange={(date) => {
                    field.onChange(date?.toString());
                    if (date) {
                      // Due date before today
                      if (date.compare(today('UTC')) < 0) {
                        form.setError('startDate', {
                          type: 'manual',
                          message: 'Start date must be in the future',
                        });
                        return;
                      }
                      // Date after due date
                      const dueDate = form.getValues('dueDate');
                      if (!dueDate) {
                        form.clearErrors('startDate');
                        return;
                      }
                      if (date.compare(parseDate(dueDate)) > 0) {
                        form.setError('startDate', {
                          type: 'manual',
                          message: 'Start date cannot be after the due date',
                        });
                        return;
                      }
                      form.clearErrors('startDate');
                    }
                  }}
                  value={field.value ? parseDate(field.value) : undefined}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="w-fit">Due Date</FormLabel>
                <DatePicker
                  error={fieldState.invalid}
                  // Disable dates before today or before the start date
                  isDateUnavailable={(date) =>
                    date.compare(today('UTC')) < 0 ||
                    (!!form.getValues('startDate') &&
                      date.compare(parseDate(form.getValues('startDate'))) < 0)
                  }
                  onChange={(date) => {
                    field.onChange(date?.toString());
                    if (date) {
                      // Due date before today
                      if (date.compare(today('UTC')) < 0) {
                        form.setError('dueDate', {
                          type: 'manual',
                          message: 'Due date must be in the future',
                        });
                        return;
                      }
                      // Date before start date
                      const startDate = form.getValues('startDate');
                      if (!startDate) {
                        form.clearErrors('dueDate');
                        return;
                      }
                      if (date.compare(parseDate(startDate)) < 0) {
                        form.setError('dueDate', {
                          type: 'manual',
                          message: 'Due date must be after the start date',
                        });
                        return;
                      }
                      form.clearErrors('dueDate');
                    }
                  }}
                  value={field.value ? parseDate(field.value) : undefined}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormButtons
          submitLoading={isLoading}
          submitText="Create"
          {...props.formButtonProps}
        />
      </form>
    </Form>
  );
}
