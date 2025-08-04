'use client';

import { useRouter } from 'next/navigation';
import UserDetailsForm from '@/components/forms/user-details-form';

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-col gap-2 text-center">
        <h1
          className="font-extrabold text-2xl"
          style={{
            fontFamily: 'var(--font-m-plus-rounded-1c)',
          }}
        >
          Your Details
        </h1>
        <p className="text-muted-foreground">
          Enter your name, number and an optional avatar below
        </p>
      </div>
      <UserDetailsForm
        formButtonProps={{ submitText: 'Continue' }}
        onSuccess={() => router.replace('/onboarding/organisation')}
      />
    </div>
  );
}
