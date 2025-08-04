'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { LoadingButton } from './loading-button';

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuthActions();
  return (
    <LoadingButton
      isLoading={isLoading}
      onClick={() => {
        setIsLoading(true);
        signIn('google');
      }}
      variant="outline"
    >
      <Image alt="Google logo" height="16" src="/google-logo.png" width="16" />
      Continue with Google
    </LoadingButton>
  );
}
