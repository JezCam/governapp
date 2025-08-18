'use client';

import type { DialogProps } from '@radix-ui/react-dialog';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { Invitation } from '@/types/convex';
import { api } from '../../../convex/_generated/api';
import LoadingButton from '../loading-button';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function ConfirmRemoveInvitationDialog(
  props: DialogProps & { invitation: Invitation }
) {
  const deleteInvitation = useMutation(api.services.invitations.deleteById);

  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = () => {
    setIsLoading(true);
    deleteInvitation({ invitationId: props.invitation._id })
      .then(() => {
        toast.success('Invitation removed successfully');
        props.onOpenChange?.(false);
      })
      .catch((error) => {
        switch (error.data) {
          case 'invitation_not_found':
            toast.error('Invitation not found');
            break;
          case 'not_admin_of_organisation':
            toast.error(
              'You must be an admin of the organisation to remove invitations'
            );
            break;
          default:
            toast.error('Failed to remove invitation');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Remove Team Member</DialogTitle>
          <DialogDescription className="flex flex-wrap items-center gap-1">
            Are you sure you want to remove the invitation to
            <span className="font-medium text-foreground">
              {props.invitation.inviteeEmail}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-between">
          <Button
            onClick={() => props.onOpenChange?.(false)}
            variant="secondary"
          >
            Cancel
          </Button>
          <LoadingButton
            className="w-fit justify-self-end"
            isLoading={isLoading}
            onClick={handleRemove}
            variant="destructive"
          >
            Remove Invitation
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
