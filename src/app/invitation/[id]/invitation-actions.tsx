'use client';

import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/loading-button';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';

export default function InvitationActions({
  invitationId,
}: {
  invitationId: Id<'invitations'>;
}) {
  const acceptInvitation = useMutation(
    api.services.invitations.acceptInvitationById
  );
  const declineInvitation = useMutation(
    api.services.invitations.declineInvitationById
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleAcceptInvitation = () => {
    setIsLoading(true);
    acceptInvitation({ invitationId })
      .then(() => {
        toast.success('Invitation accepted');

        // Redirect user to dashboard
        router.push('/dashboard');
      })
      .catch((error) => {
        switch (error.data) {
          case 'invitation_not_found':
            toast.error('Invitation not found');
            break;
          case 'invitee_email_mismatch':
            toast.error('You are not the invitee for this invitation');
            break;
          default:
            toast.error('Failed to accept invitation');
        }
      });
    setIsLoading(false);
  };

  const handleDeclineInvitation = () => {
    setIsLoading(true);
    declineInvitation({ invitationId })
      .then(() => {
        toast('Invitation declined');

        // Redirect user to dashboard
        router.push('/dashboard');
      })
      .catch((error) => {
        switch (error.data) {
          case 'invitation_not_found':
            toast.error('Invitation not found');
            break;
          case 'invitee_email_mismatch':
            toast.error('You are not the invitee for this invitation');
            break;
          default:
            toast.error('Failed to decline invitation');
        }
      });
    setIsLoading(false);
  };

  return (
    <div className="grid gap-2">
      <LoadingButton
        className="w-fit"
        isLoading={isLoading}
        onClick={handleAcceptInvitation}
        size="lg"
      >
        Join the team
      </LoadingButton>
      <LoadingButton
        isLoading={isLoading}
        onClick={handleDeclineInvitation}
        size="lg"
        variant="secondary"
      >
        Decline
      </LoadingButton>
    </div>
  );
}
