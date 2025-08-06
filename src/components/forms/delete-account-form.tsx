'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import FormButtons from './form-buttons';
import type { FormProps } from './types';

const formSchema = z.object({
  confirmText: z.string(),
});

export default function DeleteAccountForm(props: FormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmText: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Validate manually on submit
    if (values.confirmText !== 'delete my account') {
      form.setError('confirmText', {
        message: 'You must type "delete my account" to continue',
      });
      return;
    }

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
        <FormField
          control={form.control}
          name="confirmText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                To confirm, please type &quot;delete my account&quot; below
              </FormLabel>
              <FormControl>
                <Input placeholder="delete my account" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButtons
          isLoading={isLoading}
          onPrevious={props.formButtonProps?.onPrevious}
          previousText="Cancel"
          submitDestructive
          submitText="Delete Account"
        />
      </form>
    </Form>
  );
}
