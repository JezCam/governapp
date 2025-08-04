'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import validator from 'validator';
import { z } from 'zod';
import AvatarUploader from '../avatar-uploader';
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
  firstName: z.string().min(1, 'Please enter your first name'),
  lastName: z.string().min(1, 'Please enter your last name'),
  mobileNumber: z
    .string()
    .min(1, 'Please enter your mobile number')
    .refine(validator.isMobilePhone, 'Please enter a valid mobile number'),
});

export default function UserDetailsForm(props: FormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
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
    <div className="flex w-full flex-col gap-6">
      {/* Avatar Uploader */}
      <AvatarUploader />
      <Form {...form}>
        <form
          className="flex flex-col items-start gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormButtons
            className="@xl:mt-5.5 h-fit @xl:max-w-fit"
            {...props.formButtonProps}
            isLoading={isLoading}
          />
        </form>
      </Form>
    </div>
  );
}
