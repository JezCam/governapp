'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoadingButton } from '../loading-button';
import { Button } from '../ui/button';
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
import { organisationTypeSchema, organisationTypes } from './schema';

const formSchema = z.object({
  name: z.string().min(1, 'Please enter your organisation name'),
  organisationType: organisationTypeSchema,
});

export default function OrganisationConfirmForm({
  onPrevious,
  onSuccess,
}: {
  onPrevious: () => void;
  onSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
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
          name="organisationType"
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
                  {organisationTypes.map((type) => (
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
        <div className="flex items-center justify-between">
          <Button onClick={onPrevious} type="button" variant="secondary">
            Previous
          </Button>
          <LoadingButton isLoading={isLoading} type="submit" variant="outline">
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
