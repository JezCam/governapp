/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useAuthActions } from '@convex-dev/auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { HugeiconsIcon } from '@hugeicons/react';
import { InboxUnreadIcon } from '@hugeicons-pro/core-bulk-rounded';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { GoogleSignInButton } from '../google-sign-in-button';
import LoadingButton from '../loading-button';
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

export default function SignInForm({
  redirectTo,
  defaultEmail,
}: {
  redirectTo?: string;
  defaultEmail?: string;
}) {
  const { signIn } = useAuthActions();

  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    signIn('magic-link', {
      email: values.email,
      redirectTo: redirectTo ? redirectTo : '/dashboard',
    })
      .then(() => {
        toast.success('Magic link sent', {
          description: 'Please check your email to sign in.',
        });
        setMagicLinkSent(values.email);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (magicLinkSent) {
    return (
      <div className="mb-4 flex flex-col items-center justify-center gap-4">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-ga-purple-300 bg-gradient-to-b from-ga-purple-100 to-ga-purple-200 shadow-highlight transition-transform group-hover:scale-105 dark:border-ga-purple-900 dark:from-ga-purple-950 dark:to-gray-900 dark:shadow-sm">
          <HugeiconsIcon
            className="size-10 text-ga-purple-600 dark:text-ga-purple-500"
            icon={InboxUnreadIcon}
          />
        </div>
        <strong className="text-2xl">Check your inbox</strong>
        <p className="text-center text-muted-foreground text-sm">
          We sent a magic link to <strong>{magicLinkSent}</strong>. Please check
          your email to sign in.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <GoogleSignInButton redirectTo={redirectTo} />
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
                    onChange={(e) => {
                      if (e.target.value === defaultEmail) {
                        form.clearErrors('email');
                      }
                      if (defaultEmail && e.target.value !== defaultEmail) {
                        // Show warning because the email is set by default for situations like invitations
                        form.setError('email', {
                          type: 'manual',
                          message: `This invitation is for ${defaultEmail}. Please use that email to sign in.`,
                        });
                      }
                      field.onChange(e);
                    }}
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
