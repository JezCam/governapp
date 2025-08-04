import { useAuthActions } from '@convex-dev/auth/react';
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import { LoadingButton } from '@/components/loading-button';
import { Button } from '@/components/ui/button';

export default function Header({
  onClickSignIn,
}: {
  onClickSignIn: () => void;
}) {
  const { signOut } = useAuthActions();

  return (
    <header className="flex justify-between border-b p-4">
      <Image alt="GovernApp Logo" height={32} src="/logo.svg" width={164} />
      <div className="flex gap-2">
        <AuthLoading>
          <LoadingButton isLoading />
        </AuthLoading>
        <Authenticated>
          <Button onClick={() => signOut()}>Sign out</Button>
        </Authenticated>
        <Unauthenticated>
          <Button onClick={onClickSignIn}>Sign in</Button>
        </Unauthenticated>
        <Button asChild variant="secondary">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </header>
  );
}
