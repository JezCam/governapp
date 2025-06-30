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
  onClose,
  ...props
}: DialogStackProps & {
  onClose: () => void;
  overlay?: boolean;
}) {
  const [index, setIndex] = useState<number>(0);

  return (
    <DialogStack clickable index={index} onIndexChange={setIndex} {...props}>
      {overlay && <DialogStackOverlay />}

      <DialogStackBody>
        {/* Organisation Details */}
        <DialogStackContent className="h-100">
          <DialogStackHeader>
            <DialogStackTitle>Organisation Details</DialogStackTitle>
          </DialogStackHeader>
          <OrganisationDetailsForm onSuccess={() => setIndex(1)} />
        </DialogStackContent>

        {/* Organisation Confirm */}
        <DialogStackContent className="h-100">
          <DialogStackHeader>
            <DialogStackTitle>Confirm Organisation</DialogStackTitle>
          </DialogStackHeader>
          <OrganisationConfirmForm
            onPrevious={() => setIndex(0)}
            onSuccess={onClose}
          />
        </DialogStackContent>
      </DialogStackBody>
    </DialogStack>
  );
}
