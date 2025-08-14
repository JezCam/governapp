/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import type { OrganisationFormData } from '@/components/dialogs/add-organisation-dialog';
import OrganisationConfirmForm from '@/components/forms/organisation-confirm-form';
import OrganisationDetailsForm from '@/components/forms/organisation-details-form';
import InvitationCard from '@/components/invitations/invitation-card';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { api } from '../../../../convex/_generated/api';

export default function Page() {
  const pendingInvitations = useQuery(
    api.services.invitations
      .listPendingByCurrentUserWithOrganisationAndInvitedByUser
  );
  const updateCurrentUser = useMutation(api.services.users.updateCurrent);
  const router = useRouter();

  const [organisationData, setOrganisationData] =
    useState<OrganisationFormData>();
  const [step, setStep] = useState<'details' | 'confirm' | 'complete'>(
    'details'
  );
  const [pendingInvitationsIgnored, setPendingInvitationsIgnored] =
    useState(false);

  const [previousLoading, setPreviousLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnboardingComplete = () => {
    setIsLoading(true);
    updateCurrentUser({
      onboardingStep: 2,
    })
      .then(() => {
        router.replace('/dashboard');
      })
      .catch((error) => {
        switch (error.data) {
          case 'not_authenticated':
            toast.error('You must be logged in to complete onboarding');
            break;
          default:
            console.error('Unexpected error:', error);
            toast.error('Failed to complete onboarding', {
              description: 'An unexpected error occurred',
            });
            break;
        }
      });
  };

  if (step === 'complete') {
    return (
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-extrabold text-2xl">Onboarding Complete</h1>
          <p className="text-muted-foreground">
            You are now ready to start using GovernApp!
          </p>
        </div>
        <LoadingButton isLoading={isLoading} onClick={handleOnboardingComplete}>
          Go to dashboard
        </LoadingButton>
      </div>
    );
  }

  if (pendingInvitations === undefined) {
    return null; // TODO: Add skeletons for pending invitations = undefined
  }

  if (!pendingInvitationsIgnored && pendingInvitations.length > 0) {
    return (
      <div className="flex w-full flex-col items-center gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-extrabold text-2xl">
            You have been invited to join an organisation
          </h1>
          <p className="text-muted-foreground">
            You can accept an invitation or create a new organisation.
          </p>
        </div>
        {pendingInvitations.map((invitation) => (
          <InvitationCard
            invitation={invitation}
            key={invitation._id}
            onAccept={() => setStep('complete')}
          />
        ))}
        <div className="grid w-full grid-cols-[1fr_min-content_1fr] items-center gap-2 overflow-hidden text-muted-foreground text-sm">
          <Separator />
          or
          <Separator />
        </div>
        <Button
          onClick={() => setPendingInvitationsIgnored(true)}
          variant="secondary"
        >
          Create a new organisation
        </Button>
      </div>
    );
  }

  // No pending invitations

  if (step === 'confirm') {
    return (
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-extrabold text-2xl">Confirm your organisation</h1>
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
              submitText: 'Create organisation',
            }}
            onSuccess={() => setStep('complete')}
            organisationData={organisationData}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-extrabold text-2xl">Your Organisation</h1>
        <p className="text-muted-foreground">
          Enter your organisation&apos;s details below to create your team
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
