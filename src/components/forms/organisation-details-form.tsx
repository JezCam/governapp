/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'convex/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '../../../convex/_generated/api';
import type { OrganisationFormData } from '../dialogs/add-organisation-dialog';
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
import type { FormButtonProps } from './types';

// Regex patterns for ABN and ACN formatting
const ABN_REGEX = /(\d{2})(\d{3})(\d{3})(\d{3})/;
const ACN_REGEX = /(\d{3})(\d{3})(\d{3})/;

const turnoverRanges = [
  '$0 - $50,000',
  '$50,001 - $250,000',
  '$250,001 - $1m',
  '$1m - $10m',
  '$10m - $100m',
  '$100m+',
] as const;

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

const acnSchema = z
  .string()
  .transform((val) => val.replace(/\s+/g, ''))
  .pipe(
    z
      .string()
      .min(1, 'Please enter your ABN or ACN')
      .regex(/^\d{9}$/, 'ABN or ACN must be 9 or 11 digits')
  );

const abnSchema = z
  .string()
  .transform((val) => val.replace(/\s+/g, ''))
  .pipe(z.string().regex(/^\d{11}$/, 'ABN or ACN must be 9 or 11 digits'));

const formSchema = z.object({
  abnOrAcn: z.union([acnSchema, abnSchema]),
  turnoverRange: z.enum(turnoverRanges),
  role: z.string({ message: 'Please select a role' }),
  otherRole: z.string(),
});

export default function OrganisationDetailsForm(props: {
  formButtonProps?: FormButtonProps;
  onSuccess: (data: OrganisationFormData) => void;
}) {
  const getOrganisationNameAndTypeByAbnOrAcn = useAction(
    api.services.organisations.getOrganisationNameAndTypeByAbnOrAcn
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasOtherRole, setHasOtherRole] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      abnOrAcn: '',
      otherRole: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.role === 'other' && !values.otherRole) {
      form.setError('otherRole', {
        type: 'manual',
        message: 'Please specify your role',
      });
      return;
    }
    setIsLoading(true);
    // Format the ABN or ACN
    const isAbn = values.abnOrAcn.length === 11;
    const formattedAbnOrAcn = isAbn
      ? values.abnOrAcn.replace(ABN_REGEX, '$1 $2 $3 $4')
      : values.abnOrAcn.replace(ACN_REGEX, '$1 $2 $3');

    try {
      const { name, type } = await getOrganisationNameAndTypeByAbnOrAcn({
        abnOrAcn: formattedAbnOrAcn,
        isAbn,
      });

      props.onSuccess({
        name,
        type,
        abnOrAcn: formattedAbnOrAcn,
        turnoverRange: values.turnoverRange,
        role: values.role === 'other' ? values.otherRole : values.role,
      });
    } catch (error) {
      const errorWithData = error as { data?: string };
      switch (errorWithData.data) {
        case 'not_authenticated':
          toast.error('Failed to create organisation', {
            description: 'You must be logged in to create an organisation',
          });
          break;
        case 'abn_or_acn_already_exists':
          toast.error('Failed to create organisation', {
            description: 'An organisation with this ABN or ACN already exists',
          });
          form.setError('abnOrAcn', {
            type: 'manual',
            message: 'An organisation with this ABN or ACN already exists',
          });
          break;
        default:
          console.error('Unexpected error:', error);
          toast.error('Failed to create organisation', {
            description: 'An unexpected error occurred',
          });
          break;
      }
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-1 flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="abnOrAcn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation Identifier (ABN or ACN)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your ABN or ACN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="turnoverRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous FY Revenue</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your previous FY revenue" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {turnoverRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
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
                <FormLabel>Your Role</FormLabel>
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
        <FormButtons submitLoading={isLoading} {...props.formButtonProps} />
      </form>
    </Form>
  );
}
