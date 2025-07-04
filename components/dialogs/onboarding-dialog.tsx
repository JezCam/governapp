'use client';

import { useState } from 'react';
import OrganisationConfirmForm from '../forms/organisation-confirm-form';
import OrganisationDetailsForm from '../forms/organisation-details-form';
import UserDetailsForm from '../forms/user-details-form';
import WelcomeForm from '../forms/welcome-form';
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackDescription,
  DialogStackHeader,
  DialogStackOverlay,
  type DialogStackProps,
  DialogStackTitle,
} from '../ui/kibo-ui/dialog-stack';

export default function OnboardingDialog({
  overlay = true,
  ...props
}: DialogStackProps & {
  overlay?: boolean;
}) {
  const [index, setIndex] = useState<number>(0);

  return (
    <DialogStack
      clickable
      index={index}
      onIndexChange={setIndex}
      {...props}
      onOpenChange={(open) => {
        if (open) {
          return;
        }
        setIndex(0);
        props.onOpenChange?.(open);
      }}
    >
      {overlay && <DialogStackOverlay />}

      <DialogStackBody>
        {/* Welcome */}
        <DialogStackContent offset={20} showCloseButton={false}>
          <DialogStackHeader>
            <DialogStackTitle>Welcome to GovernApp</DialogStackTitle>
            <DialogStackDescription>
              To begin we will set up your profile and organisation. Click begin
              below to start the onboarding process.
            </DialogStackDescription>
          </DialogStackHeader>
          <WelcomeForm onSuccess={() => setIndex(1)} />
        </DialogStackContent>

        {/* Profile Settings */}
        <DialogStackContent offset={20} showCloseButton={false}>
          <DialogStackHeader>
            <DialogStackTitle>Your Details</DialogStackTitle>
          </DialogStackHeader>
          <UserDetailsForm
            formButtonProps={{ submitText: 'Next' }}
            onSuccess={() => setIndex(2)}
          />
        </DialogStackContent>

        {/* Organisation Details */}
        <DialogStackContent offset={20} showCloseButton={false}>
          <DialogStackHeader>
            <DialogStackTitle>
              Enter Your Organisation&apos;s Details
            </DialogStackTitle>
          </DialogStackHeader>
          <OrganisationDetailsForm onSuccess={() => setIndex(3)} />
        </DialogStackContent>

        {/* Organisation Confirm */}
        <DialogStackContent className="min-h-[374px]" showCloseButton={false}>
          <DialogStackHeader>
            <DialogStackTitle>
              Confirm Your Organisation&apos;s Details
            </DialogStackTitle>
          </DialogStackHeader>
          <OrganisationConfirmForm
            formButtonProps={{ onPrevious: () => setIndex(2) }}
            onSuccess={() => {
              props.onOpenChange?.(false);
            }}
          />
        </DialogStackContent>
      </DialogStackBody>
    </DialogStack>
  );
}
