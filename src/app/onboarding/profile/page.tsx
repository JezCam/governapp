/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import UserDetailsForm from '@/components/forms/edit-profile-form';
import { api } from '../../../../convex/_generated/api';

export default function Page() {
  const user = useQuery(api.services.users.getCurrent);
  const updateCurrentUser = useMutation(api.services.users.updateCurrent);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-extrabold text-2xl">Your Details</h1>
        <p className="text-muted-foreground">
          Enter your name, number and an optional avatar below
        </p>
      </div>
      {user ? (
        <UserDetailsForm
          formButtonProps={{
            submitText: 'Continue',
            onSubmit: () => setIsLoading(true),
            submitLoading: isLoading,
          }}
          onSuccess={() => {
            // Update the user's onboarding step to the next step
            updateCurrentUser({
              data: {
                onboardingStep: 1,
              },
            })
              .then(() => {
                router.replace('/onboarding/organisation');
              })
              .catch((error) => {
                switch (error.data) {
                  case 'not_authenticated':
                    toast.error('You must be logged in to continue');
                    break;
                  default:
                    console.error('Unexpected error:', error);
                    toast.error('Something went wrong', {
                      description: 'An unexpected error occurred',
                    });
                    break;
                }
              });
          }}
          user={user}
        />
      ) : (
        <div /> // TODO : Add skeletons for current user
      )}
    </div>
  );
}
