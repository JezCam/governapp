import { zodResolver } from '@hookform/resolvers/zod';
import { Mail01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { useAction } from 'convex/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
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
  inviteeEmail: z
    .string()
    .min(1, 'Please enter an email address')
    .email('Please enter a valid email address'),
  role: z.string({ message: 'Please select a role' }),
  otherRole: z.string(),
  permission: z.enum(['admin', 'member']),
});

export default function AddTeamMemberForm(props: FormProps) {
  const createInvitation = useAction(api.services.invitations.create);

  const [isLoading, setIsLoading] = useState(false);
  const [hasOtherRole, setHasOtherRole] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteeEmail: '',
      permission: 'member',
      otherRole: '',
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
    createInvitation({
      inviteeEmail: values.inviteeEmail,
      role: values.role === 'other' ? values.otherRole : values.role,
      isAdmin: values.permission === 'admin',
    })
      .then(() => {
        toast.success('Invitation sent successfully!');
        props.onSuccess?.();
      })
      .catch((error) => {
        console.error('Error sending invitation:', error);
        toast.error('Failed to send invitation. Please try again.');
      });
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-1 flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 items-start gap-2">
          <FormField
            control={form.control}
            name="inviteeEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member Email</FormLabel>
                <FormControl>
                  <Input placeholder="jane@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permission"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Permission</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
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
        </div>
        <div className="flex items-start gap-2">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Member Role</FormLabel>
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
          isLoading={isLoading}
          submitIcon={Mail01Icon}
          submitText="Invite"
        />
      </form>
    </Form>
  );
}
