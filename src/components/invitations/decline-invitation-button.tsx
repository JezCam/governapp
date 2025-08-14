'use client';

import { useMutation } from 'convex/react';
import { forwardRef, useState } from 'react';
import { toast } from 'sonner';
import LoadingButton, {
  type LoadingButtonProps,
} from '@/components/loading-button';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';

export interface DeclineInvitationButtonProps
  extends Omit<LoadingButtonProps, 'onClick'> {
  invitationId: Id<'invitations'>;
  onSuccess?: () => void;
  onError?: () => void;
}

const DeclineInvitationButton = forwardRef<
  HTMLButtonElement,
  DeclineInvitationButtonProps
>(({ invitationId, onSuccess, onError, children, disabled, ...rest }, ref) => {
  const [isLoading, setIsLoading] = useState(false);

  const declineInvitation = useMutation(
    api.services.invitations.declineInvitationById
  );

  const handleClick = () => {
    setIsLoading(true);
    declineInvitation({ invitationId })
      .then(() => {
        toast.success('Invitation declineed');
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
            toast.error('Failed to decline invitation');
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

DeclineInvitationButton.displayName = 'DeclineInvitationButton';

export default DeclineInvitationButton;
