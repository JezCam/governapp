'use client';

import { useState } from 'react';
import { LoadingButton } from '@/components/loading-button';

export default function AcceptInvitationButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAcceptInvitation = async () => {
    setIsLoading(true);
    // sleep for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <LoadingButton
      className="w-fit"
      isLoading={isLoading}
      onClick={handleAcceptInvitation}
      size="lg"
    >
      Join the team
    </LoadingButton>
  );
}
