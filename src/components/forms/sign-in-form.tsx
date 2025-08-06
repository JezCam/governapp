import { useAuthActions } from '@convex-dev/auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { GoogleSignInButton } from '../google-sign-in-button';
import { LoadingButton } from '../loading-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email address.')
    .email({ message: 'Invalid email address' }),
});

export default function SignInForm() {
  const { signIn } = useAuthActions();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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
    signIn('magic-link', {
      email: values.email,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <GoogleSignInButton />
      <div className="grid grid-cols-[1fr_min-content_1fr] items-center gap-2 overflow-hidden text-muted-foreground text-sm">
        <Separator />
        or
        <Separator />
      </div>
      <Form {...form}>
        <form
          className="flex flex-1 flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton isLoading={isLoading} type="submit">
            Send magic link
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
