/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import type { Domain, Framework } from '@/types/convex';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';
import { Checkbox } from '../ui/checkbox';
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

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Assessment name must contain at least 2 characters')
    .max(50, 'Assessment name cannot exceed 50 characters'),
  frameworkId: z.string().min(1, 'Please select a framework'),
  selectedDomainIds: z.array(z.string()).min(1, {
    message: 'Please select at least one domain',
  }),
});

export default function CreateSelfAssessmentForm(props: FormProps) {
  const createAssessment = useMutation(api.services.assessments.create);

  const subscribedSelfFrameworks = useQuery(
    api.services.frameworks.listSubscribedByTypeWithDomains,
    { type: 'self' }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<
    Framework & { domains: Domain[] }
  >();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      frameworkId: '',
      selectedDomainIds: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const name = values.name.trim();
    const frameworkId = values.frameworkId as Id<'frameworks'>;
    const selectedDomainIds = values.selectedDomainIds as Id<'domains'>[];
    const questionsTotal = selectedDomainIds.reduce((total, domainId) => {
      const domain = selectedFramework?.domains.find((d) => d._id === domainId);
      return total + (domain?.questionsTotal || 0);
    }, 0);

    setIsLoading(true);
    createAssessment({
      name,
      frameworkId,
      selectedDomainIds,
      questionsTotal,
    })
      .then(() => {
        toast.success('Assessment created successfully');
        props.onSuccess?.();
      })
      .catch(() => {
        toast.error('Failed to create assessment');
      })
      .finally(() => setIsLoading(false));
  }

  if (subscribedSelfFrameworks === undefined) {
    return null; // TODO: Add loading state
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
              <FormLabel>Framework</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={(value) => {
                  const framework = subscribedSelfFrameworks.find(
                    (f) => f._id === value
                  );
                  setSelectedFramework(framework);
                  form.setValue('selectedDomainIds', []);
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a framework" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subscribedSelfFrameworks.map((framework) => (
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
        {selectedFramework && (
          <FormField
            control={form.control}
            name="selectedDomainIds"
            render={() => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel>Domains</FormLabel>
                </div>
                {selectedFramework.domains.map((domain) => (
                  <FormField
                    control={form.control}
                    key={domain._id}
                    name="selectedDomainIds"
                    render={({ field }) => (
                      <FormItem
                        className="flex flex-row items-start space-x-1 space-y-0"
                        key={domain._id}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(domain._id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, domain._id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== domain._id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">
                          {domain.name}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormButtons
          submitLoading={isLoading}
          submitText="Create"
          {...props.formButtonProps}
        />
      </form>
    </Form>
  );
}
