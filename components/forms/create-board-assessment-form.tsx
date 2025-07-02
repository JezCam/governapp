import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
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
import UserMultiSelect from '../user-multiselect';
import FormButtons from './form-buttons';
import type { FormProps } from './types';

type Domain = {
  _id: string;
  name: string;
};

type Framework = {
  _id: string;
  name: string;
  domains: Domain[];
};

const frameworks: Framework[] = [
  {
    _id: '1',
    name: 'Framework 1',
    domains: [
      { _id: 'd1', name: 'Domain 1' },
      { _id: 'd2', name: 'Domain 2' },
    ],
  },
  {
    _id: '2',
    name: 'Framework 2',
    domains: [
      { _id: 'd3', name: 'Domain 3' },
      { _id: 'd4', name: 'Domain 4' },
    ],
  },
];

type User = {
  _id: string;
  name: string;
  imageUrl: string;
};

const users: User[] = [
  {
    _id: '0',
    name: 'Jeremy Cameron',
    imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
  },
  {
    _id: '1',
    name: 'Alice Johnson',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    _id: '2',
    name: 'Bob Smith',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    _id: '3',
    name: 'Charlie Brown',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
  },
  {
    _id: '4',
    name: 'Diana Prince',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
];

const userOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().url().optional(),
});

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Assessment name must contain at least 2 characters')
    .max(50, 'Assessment name cannot exceed 50 characters'),
  frameworkId: z.string().min(1, 'Please select a framework'),
  selectedDomainIds: z
    .array(z.string())
    .nonempty('Please select at least one domain'),
  selectedParticipants: z.array(userOptionSchema).min(1, {
    message: 'You must select at least one participant',
  }),
  startDate: z.date({
    required_error: 'Please select a start date',
  }),
  dueDate: z.date({
    required_error: 'Please select a due date',
  }),
});

export default function CreateBoardAssessmentForm(props: FormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<Framework>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      frameworkId: '',
      selectedDomainIds: [],
      selectedParticipants: [],
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
                    placeholder="Create a name for your new self assessment"
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
              <FormLabel>Select Framework</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={(value) => {
                  const framework = frameworks?.find((f) => f._id === value);
                  setSelectedFramework(framework);
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a framework" />
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
        {selectedFramework && (
          <FormField
            control={form.control}
            name="selectedDomainIds"
            render={() => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel>Select Domains</FormLabel>
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
        <FormField
          control={form.control}
          name="selectedParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Participants</FormLabel>
              <UserMultiSelect
                {...field}
                defaultOptions={users.map((user) => ({
                  id: user._id,
                  name: user.name,
                  imageUrl: user.imageUrl,
                }))}
                emptyIndicator={
                  <p className="text-center text-sm">No users found</p>
                }
                placeholder="Select users"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButtons isLoading={isLoading} onPrevious={props.onPrevious} />
      </form>
    </Form>
  );
}
