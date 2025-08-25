/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import type { QuestionFormQuestion } from '@/types/convex';
import type { Id } from '../../../convex/_generated/dataModel';
import { Button } from '../ui/button';

const formSchema = z.object({
  responseOptionId: z.string({ message: 'Please select an option' }),
});

export default function QuestionForm({
  question,
  onNext,
  onPrevious,
}: {
  question: QuestionFormQuestion;
  onNext?: (responseOptionId: Id<'responseOptions'>) => void;
  onPrevious?: () => void;
}) {
  console.log('Rendering QuestionForm with question:', question);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responseOptionId: question.existingResponseOptionId,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext?.(values.responseOptionId as Id<'responseOptions'>);
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
              <Button
                disabled={!onPrevious}
                onClick={onPrevious}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
