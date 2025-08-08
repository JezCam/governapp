'use client';

import { Authenticated, Unauthenticated } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import SignInButton from '@/components/sign-in-button';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="flex justify-between border-b p-4">
      <Image alt="GovernApp Logo" height={32} src="/logo.svg" width={164} />
      <div className="flex gap-2">
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
        <Authenticated>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </Authenticated>
      </div>
    </header>
  );
}
