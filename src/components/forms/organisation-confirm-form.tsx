/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { HugeiconsIcon } from '@hugeicons/react';
import { InformationCircleIcon } from '@hugeicons-pro/core-stroke-rounded';
import { useMutation } from 'convex/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '../../../convex/_generated/api';
import type { OrganisationFormData } from '../dialogs/add-organisation-dialog';
import { Alert, AlertTitle } from '../ui/alert';
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

export const types = [
  'Australian Public Company Limited by guarantee',
  'Incorporated Association',
  'Australian Private Company',
  'Other',
] as const;

const formSchema = z.object({
  name: z.string().min(1, 'Please enter your organisation name'),
  type: z.enum(types, {
    required_error: 'Please select your organisation type',
  }),
});

export default function OrganisationConfirmForm(
  props: FormProps & { organisationData: OrganisationFormData }
) {
  const createOrganisation = useMutation(api.services.organisations.create);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.organisationData.name,
      type: props.organisationData.type,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    createOrganisation({
      name: values.name,
      type: values.type,
      abnOrAcn: props.organisationData.abnOrAcn,
      turnoverRange: props.organisationData.turnoverRange,
      role: props.organisationData.role,
    })
      .then(() => {
        toast.success('Organisation created successfully');
        props.onSuccess?.();
      })
      .catch((error) => {
        console.error('Error creating organisation:', error);
        toast.error('Failed to create organisation');
      })
      .finally(() => setIsLoading(false));
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
              <FormLabel>Organisation Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your organisation name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation Type</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your organisation type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Alert>
          <HugeiconsIcon icon={InformationCircleIcon} />
          <AlertTitle>
            Information from{' '}
            <Link
              className="text-primary"
              href="https://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx"
              target="_blank"
            >
              ABN Lookup web based search services
            </Link>
          </AlertTitle>
        </Alert>
        <FormButtons submitLoading={isLoading} {...props.formButtonProps} />
      </form>
    </Form>
  );
}
