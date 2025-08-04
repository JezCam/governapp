import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { teamMembers } from '@/dummy-data/team';
import AcceptInvitationButton from './accept-invitation-button';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invitedByEmail = 'lee@example.com';

  return (
    <div className="relative flex min-h-screen min-w-screen items-center justify-center bg-background">
      <Image
        alt="GovernApp logo"
        className="absolute top-8 left-8"
        height={32}
        src="/logomark.svg"
        width={32}
      />
      <div className="flex w-full max-w-sm flex-col items-center gap-12">
        <div className="flex flex-col gap-2 text-center">
          <h1
            className="text-center text-2xl"
            style={{
              fontFamily: 'var(--font-m-plus-rounded-1c)',
            }}
          >
            Join <strong>Enigma</strong> on <strong>GovernApp</strong>
          </h1>
          <p className="text text-muted-foreground">
            <strong>Lee</strong> (
            <Link
              className="text-blue-600 no-underline"
              href={`mailto:${invitedByEmail}`}
            >
              {invitedByEmail}
            </Link>
            ) has invited ({id}) you to the <strong>Enigma</strong> team on{' '}
            <strong>GovernApp</strong>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            alt="avatar"
            className="rounded-full"
            height={64}
            src={teamMembers[0].imageUrl}
            width={64}
          />
          <ArrowRight className="text-muted-foreground" />
          <div className="h-16 w-16 rounded-full bg-accent" />
        </div>
        <AcceptInvitationButton />
      </div>
    </div>
  );
}
