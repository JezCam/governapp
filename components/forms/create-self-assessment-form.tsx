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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import FormButtons from './form-buttons';
import type { FormProps } from './types';

const frameworks = [
  { _id: '1', name: 'Framework 1' },
  { _id: '2', name: 'Framework 2' },
  { _id: '3', name: 'Framework 3' },
  { _id: '4', name: 'Framework 4' },
];

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Assessment name must contain at least 2 characters')
    .max(50, 'Assessment name cannot exceed 50 characters'),
  frameworkId: z.string().min(1, 'Please select a framework'),
});

export default function CreateSelfAssessmentForm(props: FormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      frameworkId: '',
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
    props.onSuccess();
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
              <FormLabel>Assessment Name</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    className="pe-14"
                    maxLength={50}
                    placeholder="Create a name for your self assessment"
                    {...field}
                  />
                </FormControl>
                <output
                  aria-live="polite"
                  className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground text-xs tabular-nums peer-disabled:opacity-50"
                >
                  {field.value.length}/50
                </output>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="frameworkId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Self-Assessment Framework</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Please select a framework" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {frameworks.map((framework) => (
                    <SelectItem key={framework._id} value={framework._id}>
                      {framework.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButtons isLoading={isLoading} onPrevious={props.onPrevious} />
      </form>
    </Form>
  );
}
