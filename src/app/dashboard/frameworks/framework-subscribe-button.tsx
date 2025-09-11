'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useAction } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';
import LoadingButton from '@/components/loading-button';
import { api } from '../../../../convex/_generated/api';

export default function FrameworkSubscribeButton({
  className,
  priceId,
}: {
  className?: string;
  priceId?: string;
}) {
  const subscribe = useAction(api.stripe.checkout);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = () => {
    setIsLoading(true);
    subscribe({ priceId })
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
      onClick={handleSubscribe}
      size="sm"
    >
      Subscribe
    </LoadingButton>
  );
}
