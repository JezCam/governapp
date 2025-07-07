'use client';

import type { DialogProps } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoadingButton } from '../loading-button';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import UserAvatar from '../user-avatar';

type User = {
  name: string;
  imageUrl?: string;
};

export default function ConfirmRemoveTeamMemberDialog(
  props: DialogProps & { user: User }
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
            Are you sure you want to remove{' '}
            <span className="!h-0 flex items-center gap-1 font-medium">
              <UserAvatar className="inline-block size-6" user={props.user} />
              {props.user.name}
            </span>
            from your team?
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
            Remove
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
