'use client';

import { Authenticated, Unauthenticated, useQuery } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import SignInButton from '@/components/sign-in-button';
import UserAvatar from '@/components/user-avatar';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import InvitationActions from './invitation-actions';

export default function InvitationClient() {
  const params = useParams();

  const invitation = useQuery(api.services.invitations.getById, {
    id: params.id as Id<'invitations'>,
  });

  if (invitation === undefined) {
    return null; // TODO: Implement a loading state
  }

  if (invitation === null) {
    return <div>Invitation not found</div>; // TODO: Implement a not found page
  }

  if (invitation.status === 'accepted') {
    return <strong>This invitation has been accepted</strong>;
  }

  if (invitation.status === 'declined') {
    return <strong>This invitation has been declined</strong>;
  }

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-12">
      <div className="flex flex-col gap-4 text-center">
        <h1
          className="text-center text-2xl"
          style={{
            fontFamily: 'var(--font-m-plus-rounded-1c)',
          }}
        >
          Join <strong>{invitation.organisationName}</strong> on{' '}
          <strong>GovernApp</strong>
        </h1>
        <p className="text text-muted-foreground">
          <strong>{invitation.invitedByName}</strong> (
          <Link
            className="text-blue-600 no-underline"
            href={`mailto:${invitation.invitedByEmail}`}
          >
            {invitation.invitedByEmail}
          </Link>
          ) has invited you to the{' '}
          <strong>{invitation.organisationName}</strong> team on{' '}
          <strong>GovernApp</strong>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <UserAvatar className="size-16" user={invitation.inviteeUser} />
        <ArrowRight className="text-muted-foreground" />
        <div className="h-16 w-16 rounded-full bg-accent" />
      </div>
      <Authenticated>
        <InvitationActions invitationId={invitation._id} />
      </Authenticated>
      <Unauthenticated>
        <SignInButton redirectTo={`/invitation/${invitation._id}`} />
      </Unauthenticated>
    </div>
  );
}
