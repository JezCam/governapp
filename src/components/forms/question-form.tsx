/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { QuestionWithResponseOptions } from '@/types/convex';
import LoadingButton from '../loading-button';

const formSchema = z.object({
  responseOptionId: z.string({ message: 'Please select an option' }),
});

export default function QuestionForm({
  question,
  onNext,
  onPrevious,
}: {
  question: QuestionWithResponseOptions;
  onNext?: () => void;
  onPrevious?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(false);
    onNext?.();
    // TODO: Implement create response and go back on error and clearing form etc
  }

  return (
    <div className="flex size-full flex-col items-center overflow-auto p-4 py-12">
      <div className="flex w-xl flex-col gap-8">
        <p className="text-center font-medium">{question.text}</p>
        <Form {...form}>
          <form
            className="flex h-full min-h-fit flex-col gap-8"
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
                      {question.responseOptions.map((option) => (
                        <FormItem key={option._id}>
                          <FormControl>
                            <FormLabel
                              className="group flex w-full cursor-pointer items-center gap-4 rounded-md border bg-accent p-4 transition-colors has-data-[state=checked]:border-ga-purple-200 has-data-[state=checked]:bg-ga-purple-100 dark:has-data-[state=checked]:border-ga-purple-800 dark:has-data-[state=checked]:bg-ga-purple-950"
                              htmlFor={option._id}
                            >
                              <RadioGroupItem
                                checked={field.value === option._id}
                                id={option._id}
                                value={option._id}
                              />
                              <span className="font-medium transition-colors group-has-data-[state=checked]:text-primary">
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
                disabled={isLoading || !onPrevious}
                onClick={onPrevious}
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
