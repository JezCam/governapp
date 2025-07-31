'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import FrameworkInfoCard from '@/app/dashboard/assessments/[id]/framework-info-card';
import { LoadingButton } from '@/components/loading-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const infoCards = [
  {
    variant: 'domain',
    title: ' GovernApp Self Assessment Framework Domain',
    description:
      'This is a basic framework to test basic governance knowledge. It is intended as an introductory assessment for new Board members, and is also useful for more experience Board members who are learning to use the GovernApp interface.',
  },
  {
    variant: 'section',
    title: 'People and Place Section',
    description:
      'The People and Place Section examines the relationship between Board and Management, Board roles and responsibilities and basic governance concepts.',
  },
];

const responseOptions = [
  { text: 'Chair only.', id: '0' },
  { text: 'Chair and Deputy Chair.', id: '1' },
  { text: 'Chair, Deputy Chair and Secretary.', id: '2' },
  { text: 'Chair, Deputy Chair, Secretary and Treasurer.', id: '3' },
  { text: 'Chair and Secretary only.', id: '4' },
  { text: 'Chair, Secretary and Treasurer.', id: '5' },
  { text: 'Chair, Deputy Chair, Secretary, and Treasurer.', id: '6' },
];

const formSchema = z.object({
  responseOptionId: z.string({ message: 'Please select an option' }),
});

export default function QuestionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
  }

  return (
    <div className="flex size-full flex-col items-center overflow-auto p-4">
      <div className="flex w-xl flex-col gap-6">
        <div className="flex flex-col gap-4">
          {infoCards.map((info) => (
            <FrameworkInfoCard
              description={info.description}
              key={info.title}
              title={info.title}
              variant={info.variant as 'domain' | 'section'}
            />
          ))}
        </div>
        <p className="text-center font-medium">
          If you are an Incorporated Association, other than general members,
          what specific leadership roles are operating on your Board (whether
          occupied or currently vacant)?
        </p>
        <Form {...form}>
          <form
            className="flex h-full min-h-fit flex-col gap-12"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="responseOptionId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {responseOptions.map((option) => (
                        <FormItem key={option.id}>
                          <FormControl>
                            <FormLabel
                              className="group flex w-full cursor-pointer items-center gap-4 rounded-md border bg-accent p-4 transition-all has-data-[state=checked]:border-primary/30 has-data-[state=checked]:bg-primary/15"
                              htmlFor={option.id}
                            >
                              <RadioGroupItem
                                checked={field.value === option.id}
                                className="bg-background"
                                id={option.id}
                                value={option.id}
                              />
                              <span className="font-medium transition-all group-has-data-[state=checked]:text-primary">
                                {option.text}
                              </span>
                            </FormLabel>
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <LoadingButton
                disabled={isLoading}
                type="button"
                variant="secondary"
              >
                Previous
              </LoadingButton>
              <LoadingButton isLoading={isLoading} type="submit">
                Next
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
