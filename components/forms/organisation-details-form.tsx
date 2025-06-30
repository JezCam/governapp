'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoadingButton } from '../loading-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { abnOrAcnSchema } from './schema';

const formSchema = z.object({
  abnOrAcn: abnOrAcnSchema,
});

export default function OrganisationDetailsForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      abnOrAcn: '',
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
    onSuccess();
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
        <LoadingButton isLoading={isLoading} type="submit" variant="outline">
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
