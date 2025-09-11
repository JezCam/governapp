'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useAction } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '../../convex/_generated/api';
import LoadingButton from './loading-button';

export default function ActivateButton({ className }: { className?: string }) {
  const activate = useAction(api.stripe.checkout);

  const [isLoading, setIsLoading] = useState(false);

  const handleActivate = () => {
    setIsLoading(true);
    activate({})
      .then(async (session) => {
        const stripe = await loadStripe(
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );
        if (stripe === null) {
          return;
        }
        await stripe.redirectToCheckout({ sessionId: session.id });
      })
      .catch(() => {
        toast.error(
          'An error occurred while initiating checkout. Please try again.'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <LoadingButton
      className={className}
      isLoading={isLoading}
      onClick={handleActivate}
      size="sm"
    >
      Activate
    </LoadingButton>
  );
}
