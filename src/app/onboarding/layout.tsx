import Image from 'next/image';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen min-w-screen items-center justify-center bg-background">
      <Image
        alt="GovernApp logo"
        className="absolute top-8 left-8"
        height={32}
        src="/logomark.svg"
        width={32}
      />
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
