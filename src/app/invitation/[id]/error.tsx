'use client';

import { Authenticated, Unauthenticated } from 'convex/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      Invitation not found
      <Authenticated>
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </Authenticated>
      <Unauthenticated>
        <Button asChild>
          <Link href="/home">Go home</Link>
        </Button>
      </Unauthenticated>
    </div>
  );
}
