/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import type { OrganisationFormData } from '@/components/dialogs/add-organisation-dialog';
import OrganisationConfirmForm from '@/components/forms/organisation-confirm-form';
import OrganisationDetailsForm from '@/components/forms/organisation-details-form';
import { api } from '../../../../convex/_generated/api';

export default function Page() {
  const updateCurrentUser = useMutation(api.services.users.updateCurrent);
  const router = useRouter();

  const [organisationData, setOrganisationData] =
    useState<OrganisationFormData>();
  const [step, setStep] = useState<'details' | 'confirm'>('details');
  const [previousLoading, setPreviousLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (step === 'confirm') {
    return (
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col gap-2 text-center">
          <h1
            className="font-extrabold text-2xl"
            style={{
              fontFamily: 'var(--font-m-plus-rounded-1c)',
            }}
          >
            Confirm your organisation
          </h1>
          <p className="text-muted-foreground">
            Confirm the details of your organisation below
          </p>
        </div>
        {organisationData && (
          <OrganisationConfirmForm
            formButtonProps={{
              onPrevious: () => {
                setStep('details');
                setOrganisationData(undefined);
              },
              onSubmit: () => setIsLoading(true),
              submitLoading: isLoading,
              submitText: 'Complete',
            }}
            onSuccess={() => {
              updateCurrentUser({
                onboardingStep: 2,
              })
                .then(() => {
                  router.replace('/dashboard');
                })
                .catch((error) => {
                  switch (error.data) {
                    case 'not_authenticated':
                      toast.error(
                        'You must be logged in to complete onboarding'
                      );
                      break;
                    default:
                      console.error('Unexpected error:', error);
                      toast.error('Failed to complete onboarding', {
                        description: 'An unexpected error occurred',
                      });
                      break;
                  }
                });
            }}
            organisationData={organisationData}
          />
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-col gap-2 text-center">
        <h1
          className="font-extrabold text-2xl"
          style={{
            fontFamily: 'var(--font-m-plus-rounded-1c)',
          }}
        >
          Your Organisation
        </h1>
        <p className="text-muted-foreground">
          Enter your organisation&apos;s details below
        </p>
      </div>
      <OrganisationDetailsForm
        formButtonProps={{
          previousLoading,
          onPrevious: () => {
            setPreviousLoading(true);
            // Update the user's onboarding step to the previous step
            updateCurrentUser({
              onboardingStep: 0,
            })
              .then(() => {
                router.refresh();
              })
              .catch((error) => {
                switch (error.data) {
                  case 'not_authenticated':
                    toast.error('You must be logged in');
                    break;
                  default:
                    console.error('Unexpected error:', error);
                    toast.error('Failed to complete onboarding', {
                      description: 'An unexpected error occurred',
                    });
                    break;
                }
              });
          },
          submitText: 'Continue',
        }}
        onSuccess={(data) => {
          setOrganisationData(data);
          setStep('confirm');
        }}
      />
    </div>
  );
}
