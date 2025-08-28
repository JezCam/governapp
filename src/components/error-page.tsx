'use client';

import Image from 'next/image';
import { Button } from './ui/button';

export default function ErrorPage({ error }: { error: { data: string } }) {
  const handleGoToDashboard = () => {
    // Use window.location for full page navigation to escape error boundary
    window.location.href = '/dashboard';
  };

  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center gap-12"
      role="alert"
    >
      <Image
        alt="GovernApp Logomark"
        height={64}
        src={'/logomark.svg'}
        width={64}
      />

      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-2xl">Uh oh, Something went wrong</h1>
        <pre className="text-red-500">{error.data}</pre>
      </div>

      <Button onClick={handleGoToDashboard} variant="secondary">
        Go to dashboard
      </Button>
    </div>
  );
}
