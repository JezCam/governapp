'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseDate, today } from '@internationalized/date';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { actionStatuses } from '@/dummy-data/actions';
import { assessmentStatuses } from '@/dummy-data/assessments';
import { teamMembers } from '@/dummy-data/team';
import DatePicker from '../date-picker';
import StatusLabel from '../labels/status-label';
import UserLabel from '../labels/user-label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import FormButtons from './form-buttons';
import type { FormProps } from './types';

const formSchema = z.object({
  status: z.enum(actionStatuses, { message: 'Please select a status' }),
  dueDate: z.string().min(1, 'Please select a due date'),
  assignee: z.string().min(1, 'Please select an assignee'),
});

export default function EditActionForm(props: FormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dueDate: '',
      assignee: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    console.log('Form submitted:', values);
    // sleep for 1 second to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.error('Not yet implemented', {
      description: 'This feature is not yet implemented.',
    });
    props.onSuccess?.();
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-1 flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {assessmentStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        <StatusLabel status={status} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  isDateUnavailable={(date) => date.compare(today('UTC')) < 0}
                  isNonModal
                  // Disable dates before today
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
                      form.clearErrors('dueDate');
                    }
                  }}
                  placement="bottom right"
                  value={field.value ? parseDate(field.value) : undefined}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Assignee</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an assignee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teamMembers.map((teamMember) => (
                    <SelectItem
                      key={teamMember.userId}
                      value={teamMember.userId}
                    >
                      <UserLabel user={teamMember} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButtons
          {...props.formButtonProps}
          className="mt-2"
          isLoading={isLoading}
          submitText="Update"
        />
      </form>
    </Form>
  );
}
