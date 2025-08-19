/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import type { Membership, User } from '@/types/convex';
import { api } from '../../../convex/_generated/api';
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
import FormButtons from './form-buttons';
import type { FormProps } from './types';

const roles = [
  'Audit Committee Member',
  'Board Member',
  'Chair',
  'Chief Executive Officer',
  'Compensation Committee Member',
  'Director',
  'Governance Committee Member',
  'Nomination Committee Member',
  'President',
  'Secretary',
  'Treasurer',
  'Vice Chair',
];

const formSchema = z.object({
  role: z.string({ message: 'Please select a role' }),
  otherRole: z.string(),
  permission: z.enum(['admin', 'member']),
});

export default function EditTeamMemberForm(
  props: FormProps & { membership: Membership & { user: User } }
) {
  const updateMembership = useMutation(api.services.memberships.update);

  const [isLoading, setIsLoading] = useState(false);
  const [hasOtherRole, setHasOtherRole] = useState(
    !roles.includes(props.membership.role)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: roles.includes(props.membership.role)
        ? props.membership.role
        : 'other',
      otherRole: roles.includes(props.membership.role)
        ? ''
        : props.membership.role,
      permission: props.membership.isAdmin ? 'admin' : 'member',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.role === 'other' && !values.otherRole.length) {
      form.setError('otherRole', {
        type: 'manual',
        message: 'Please specify your role',
      });
      return;
    }

    setIsLoading(true);
    updateMembership({
      id: props.membership._id,
      data: {
        role: values.role === 'other' ? values.otherRole : values.role,
        isAdmin: values.permission === 'admin',
      },
    })
      .then(() => {
        toast.success('Team member updated successfully');
        props.onSuccess?.();
      })
      .catch((error) => {
        console.error('Failed to update team member:', error);
        toast.error('Failed to update team member');
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
        <FormField
          control={form.control}
          name="permission"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Permission</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem key={'member'} value={'member'}>
                    Member
                  </SelectItem>
                  <SelectItem key={'admin'} value={'admin'}>
                    Admin
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start gap-2">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Role</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={(role) => {
                    if (role === 'other') {
                      setHasOtherRole(true);
                    } else {
                      setHasOtherRole(false);
                    }
                    field.onChange(role);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                    <SelectItem key={'other'} value={'other'}>
                      Other - Please specify
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasOtherRole && (
            <FormField
              control={form.control}
              name="otherRole"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Please Specify Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormButtons
          submitLoading={isLoading}
          submitText="Save"
          {...props.formButtonProps}
        />
      </form>
    </Form>
  );
}
