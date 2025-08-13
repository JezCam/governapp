'use client';

import { useMutation } from 'convex/react';
import { forwardRef, useState } from 'react';
import { toast } from 'sonner';
import LoadingButton, {
  type LoadingButtonProps,
} from '@/components/loading-button';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';

export interface AcceptInvitationButtonProps
  extends Omit<LoadingButtonProps, 'onClick'> {
  invitationId: Id<'invitations'>;
  onSuccess?: () => void;
  onError?: () => void;
}

const AcceptInvitationButton = forwardRef<
  HTMLButtonElement,
  AcceptInvitationButtonProps
>(({ invitationId, onSuccess, onError, children, disabled, ...rest }, ref) => {
  const [isLoading, setIsLoading] = useState(false);

  const acceptInvitation = useMutation(
    api.services.invitations.acceptInvitationById
  );

  const handleClick = () => {
    setIsLoading(true);
    acceptInvitation({ invitationId })
      .then(() => {
        toast.success('Invitation accepted');
        onSuccess?.();
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
        onError?.();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <LoadingButton
      disabled={disabled}
      isLoading={isLoading}
      ref={ref}
      {...rest}
      onClick={handleClick}
    >
      {children}
    </LoadingButton>
  );
});

AcceptInvitationButton.displayName = 'AcceptInvitationButton';

export default AcceptInvitationButton;
