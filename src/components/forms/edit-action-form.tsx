/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  fromDate,
  parseDate,
  toCalendarDate,
  today,
} from '@internationalized/date';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import type { Action } from '@/types/convex';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';
import { statuses } from '../../../convex/schemas/actions';
import { assessmentStatuses } from '../../../convex/schemas/assessments';
import DatePicker from '../date-picker';
import StatusLabel from '../labels/status-label';
import UsersSelect from '../memberships/users-select';
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
  status: z.enum(statuses, { message: 'Please select a status' }),
  dueDate: z.string().min(1, 'Please select a due date'),
  assigneeUserId: z.string().optional(),
});

export default function EditActionForm(props: FormProps & { action: Action }) {
  const editAction = useMutation(api.services.actions.update);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: props.action.status,
      dueDate: toCalendarDate(
        fromDate(new Date(props.action.dueDate), 'UTC')
      ).toString(),
      assigneeUserId: props.action.assigneeUserId,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    editAction({
      id: props.action._id,
      status: values.status,
      dueDate: new Date(values.dueDate).getTime(),
      ...(values.assigneeUserId && {
        assigneeUserId: values.assigneeUserId as Id<'users'>,
      }),
    })
      .then(() => {
        toast.success('Action updated successfully');
      })
      .catch((error) => {
        switch (error.data) {
          case 'ACTION_NOT_FOUND':
            toast.error('Action not found');
            break;
          default:
            toast.error('An error occurred while updating the action');
            console.error(error);
            break;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          name="assigneeUserId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Assignee</FormLabel>
              <UsersSelect
                className="w-full"
                defaultValue={field.value}
                onValueChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButtons
          className="mt-2"
          submitLoading={isLoading}
          submitText="Update"
          {...props.formButtonProps}
        />
      </form>
    </Form>
  );
}
