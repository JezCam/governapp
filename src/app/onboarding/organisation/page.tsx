'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import OrganisationConfirmForm from '@/components/forms/organisation-confirm-form';
import OrganisationDetailsForm from '@/components/forms/organisation-details-form';

export default function Page() {
  const [step, setStep] = useState<'details' | 'confirm'>('details');
  const router = useRouter();

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
        <OrganisationConfirmForm
          formButtonProps={{
            onPrevious: () => setStep('details'),
            submitText: 'Complete',
          }}
          onSuccess={() => router.replace('/dashboard')}
        />
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
          onPrevious: () => router.replace('/onboarding/profile'),
          submitText: 'Continue',
        }}
        onSuccess={() => setStep('confirm')}
      />
    </div>
  );
}
