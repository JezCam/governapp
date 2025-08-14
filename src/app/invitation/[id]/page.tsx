'use client';

import { Authenticated, Unauthenticated, useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import SignInButton from '@/components/sign-in-button';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import InvitationAuthenticated from './authenticated';

export default function InvitationClient() {
  const params = useParams();

  const invitation = useQuery(
    api.services.invitations.getByIdWithOrganisation,
    {
      id: params.id as Id<'invitations'>,
    }
  );

  if (invitation === undefined) {
    return null; // TODO: Implement a loading state
  }

  if (invitation === null) {
    return <div>Invitation not found</div>; // TODO: Implement a not found page
  }

  return (
    <>
      <Unauthenticated>
        <div className="flex flex-col items-center gap-4">
          You are not signed in. Please sign in to accept or decline the
          invitation.
          <SignInButton
            defaultEmail={invitation.inviteeEmail}
            redirectTo={`/invitation/${invitation._id}`}
          />
        </div>
      </Unauthenticated>
      <Authenticated>
        <InvitationAuthenticated
          invitation={invitation}
          invitedByUser={invitation.invitedByUser}
          inviteeUser={invitation.inviteeUser}
          organisation={invitation.organisation}
        />
      </Authenticated>
    </>
  );
}
