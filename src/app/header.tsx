import Image from 'next/image';
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
      </div>
    </header>
  );
}
