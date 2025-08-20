/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import validator from 'validator';
import { z } from 'zod';
import type { User } from '@/types/convex';
import { api } from '../../../convex/_generated/api';
import UserImageUploader from '../avatars/user-image-uploader';
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

export default function EditProfileForm(props: FormProps & { user: User }) {
  const updateCurrentUser = useMutation(api.services.users.updateCurrent);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: props.user.firstName || '',
      lastName: props.user.lastName || '',
      mobileNumber: props.user.phone || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    updateCurrentUser({
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.mobileNumber,
      },
    })
      .then(() => {
        toast.success('Your details have been updated successfully');
        props.onSuccess?.();
      })
      .catch((error) => {
        switch (error.data) {
          case 'not_authenticated':
            toast.error('You must be logged in to update your details');
            break;
          default:
            console.error('Unexpected error:', error);
            toast.error('Failed to update your details', {
              description: 'An unexpected error occurred',
            });
            break;
        }
      })
      .finally(() => {
        if (!props.redirectOnSuccess) {
          setIsLoading(false);
        }
      });
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Avatar Uploader */}
      <UserImageUploader imageUrl={props.user.imageUrl} />
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
            submitLoading={isLoading}
            {...props.formButtonProps}
          />
        </form>
      </Form>
    </div>
  );
}
