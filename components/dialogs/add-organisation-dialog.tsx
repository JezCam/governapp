'use client';

import { useState } from 'react';
import OrganisationConfirmForm from '../forms/organisation-confirm-form';
import OrganisationDetailsForm from '../forms/organisation-details-form';
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackHeader,
  DialogStackOverlay,
  type DialogStackProps,
  DialogStackTitle,
} from '../ui/kibo-ui/dialog-stack';

export default function AddOrganisationDialog({
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
        {/* Organisation Details */}
        <DialogStackContent offset={20}>
          <DialogStackHeader>
            <DialogStackTitle>
              Enter Your Organisation&apos;s Details
            </DialogStackTitle>
          </DialogStackHeader>
          <OrganisationDetailsForm onSuccess={() => setIndex(1)} />
        </DialogStackContent>

        {/* Organisation Confirm */}
        <DialogStackContent className="min-h-[374px]">
          <DialogStackHeader>
            <DialogStackTitle>
              Confirm Your Organisation&apos;s Details
            </DialogStackTitle>
          </DialogStackHeader>
          <OrganisationConfirmForm
            formButtonProps={{ onPrevious: () => setIndex(0) }}
            onSuccess={() => {
              setIndex(0);
              props.onOpenChange?.(false);
            }}
          />
        </DialogStackContent>
      </DialogStackBody>
    </DialogStack>
  );
}
