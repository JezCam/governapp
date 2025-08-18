'use client';

import type { DialogProps } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import type { Invitation } from '@/types/convex';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    // sleep for 1 second to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.error('Not yet implemented', {
      description: 'This feature is not yet implemented.',
    });
    props.onOpenChange?.(false); // Close the dialog after removal
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
