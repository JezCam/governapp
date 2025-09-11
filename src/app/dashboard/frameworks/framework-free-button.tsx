'use client';

import { useMutation } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';
import LoadingButton from '@/components/loading-button';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';

export default function FrameworkFreeButton({
  className,
  frameworkId,
}: {
  className?: string;
  frameworkId: Id<'frameworks'>;
}) {
  const createSubscription = useMutation(
    api.services.subscriptions.createFreeForActiveOrganisation
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = () => {
    setIsLoading(true);
    createSubscription({ frameworkId })
      .then(() => {
        toast.success('Successfully subscribed to the framework');
      })
      .catch(() => {
        toast.error(' An error occurred while subscribing to the framework');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <LoadingButton
      className={className}
      isLoading={isLoading}
      onClick={handleSubscribe}
      size="sm"
    >
      Subscribe
    </LoadingButton>
  );
}
