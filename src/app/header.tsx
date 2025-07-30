import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header({
  onClickSignIn,
}: {
  onClickSignIn: () => void;
}) {
  return (
    <header className="flex justify-between border-b p-4">
      <Image alt="GovernApp Logo" height={32} src="/logo.svg" width={164} />
      <div className="flex gap-2">
        <Button onClick={onClickSignIn}>Sign in</Button>
        <Button asChild variant="secondary">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </header>
  );
}
