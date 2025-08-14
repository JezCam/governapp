'use client';

import { useState } from 'react';
import SignInDialog from './dialogs/sign-in-dialog';
import { Button } from './ui/button';

export default function SignInButton({
  redirectTo,
  defaultEmail,
}: {
  redirectTo?: string;
  defaultEmail?: string;
}) {
  const [signInOpen, setSignInOpen] = useState(false);

  return (
    <>
      <SignInDialog
        defaultEmail={defaultEmail}
        onOpenChange={setSignInOpen}
        open={signInOpen}
        redirectTo={redirectTo}
      />
      <Button onClick={() => setSignInOpen(true)}>Sign in</Button>
    </>
  );
}
