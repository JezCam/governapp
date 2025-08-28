'use client';

import { useState } from 'react';
import type {
  OrganisationTurnoverRange,
  OrganisationType,
} from '@/types/convex';
import OrganisationConfirmForm from '../forms/organisation-confirm-form';
import OrganisationDetailsForm from '../forms/organisation-details-form';
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackHeader,
  type DialogStackProps,
  DialogStackTitle,
} from '../ui/kibo-ui/dialog-stack';

export type OrganisationFormData = {
  name: string;
  type: OrganisationType;
  abnOrAcn: string;
  turnoverRange: OrganisationTurnoverRange;
  role: string;
};

export default function AddOrganisationDialog({ ...props }: DialogStackProps) {
  const [organisationData, setOrganisationData] =
    useState<OrganisationFormData>();
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
      <DialogStackBody>
        {/* Organisation Details */}
        <DialogStackContent offset={20}>
          <DialogStackHeader>
            <DialogStackTitle>
              Enter Your Organisation&apos;s Details
            </DialogStackTitle>
          </DialogStackHeader>
          <OrganisationDetailsForm
            formButtonProps={{ submitText: 'Next' }}
            onSuccess={(data) => {
              setOrganisationData(data);
              setIndex(1);
            }}
          />
        </DialogStackContent>

        {/* Organisation Confirm */}
        <DialogStackContent className="min-h-[374px]">
          <DialogStackHeader>
            <DialogStackTitle>
              Confirm Your Organisation&apos;s Details
            </DialogStackTitle>
          </DialogStackHeader>
          {organisationData && (
            <OrganisationConfirmForm
              formButtonProps={{
                onPrevious: () => setIndex(0),
                submitText: 'Create Organisation',
              }}
              onSuccess={() => {
                setIndex(0);
                props.onOpenChange?.(false);
              }}
              organisationData={organisationData}
            />
          )}
        </DialogStackContent>
      </DialogStackBody>
    </DialogStack>
  );
}
