'use client';

import { useQuery } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import OrganisationAvatar from '@/components/avatars/organisation-avatar';
import UserAvatar from '@/components/avatars/user-avatar';
import AcceptInvitationButton from '@/components/invitations/accept-invitation-button';
import DeclineInvitationButton from '@/components/invitations/decline-invitation-button';
import SignInButton from '@/components/sign-in-button';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { Invitation, Organisation, User } from '@/types/convex';
import { api } from '../../../../convex/_generated/api';

export default function InvitationAuthenticated({
  invitation,
  organisation,
  invitedByUser,
  inviteeUser,
}: {
  invitation: Invitation;
  organisation: Organisation;
  invitedByUser: User;
  inviteeUser: User | null;
}) {
  const currentUser = useQuery(api.services.users.getCurrent);

  if (currentUser === undefined) {
    return null; // TODO: Implement a loading state
  }

  if (invitation.inviteeEmail !== currentUser.email) {
    return (
      <div className="flex flex-col items-center gap-4">
        This invitation is for {invitation.inviteeEmail}. Please sign in to
        accept or decline the invitation.
        <SignInButton
          defaultEmail={invitation.inviteeEmail}
          redirectTo={`/invitation/${invitation._id}`}
        />
      </div>
    );
  }

  if (invitation.status === 'accepted' || invitation.status === 'declined') {
    return (
      <div className="flex flex-col items-center gap-4">
        <strong>This invitation has been {invitation.status}</strong>
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-12">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-center text-2xl">
          Join <strong>{organisation.name}</strong> on{' '}
          <strong>GovernApp</strong>
        </h1>
        <p className="text text-muted-foreground">
          <strong>{invitedByUser.name}</strong> (
          <Link
            className="text-primary no-underline"
            href={`mailto:${invitedByUser.email}`}
          >
            {invitedByUser.email}
          </Link>
          ) has invited you to the <strong>{organisation.name}</strong> team on{' '}
          <strong>GovernApp</strong>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <UserAvatar className="size-16" user={inviteeUser} />
        <ArrowRight className="text-muted-foreground" />
        <OrganisationAvatar className="size-16" organisation={organisation} />
      </div>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Decline</Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-2 p-3 " side="top">
            <strong className="text-sm">Are you sure?</strong>
            <DeclineInvitationButton
              invitationId={invitation._id}
              size="sm"
              variant="destructive"
            >
              Yes, decline
            </DeclineInvitationButton>
          </PopoverContent>
        </Popover>
        <AcceptInvitationButton invitationId={invitation._id}>
          Join the team
        </AcceptInvitationButton>
      </div>
    </div>
  );
}
