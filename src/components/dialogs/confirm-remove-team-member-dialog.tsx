'use client';

import type { DialogProps } from '@radix-ui/react-dialog';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { Membership, User } from '@/types/convex';
import { api } from '../../../convex/_generated/api';
import UserAvatar from '../avatars/user-avatar';
import LoadingButton from '../loading-button';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function ConfirmRemoveTeamMemberDialog(
  props: DialogProps & { membership: Membership & { user: User } }
) {
  const removeTeamMember = useMutation(api.services.memberships.remove);

  const [isLoading, setIsLoading] = useState(false);

  const user = props.membership.user;

  const handleRemove = () => {
    setIsLoading(true);
    removeTeamMember({ id: props.membership._id })
      .then(() => {
        toast.success('Team member removed successfully');
        props.onOpenChange?.(false);
      })
      .catch((error) => {
        switch (error.data) {
          case 'membership_not_found':
            toast.error('Membership not found');
            break;
          case 'cannot_remove_organisation_creator':
            toast.error('You cannot remove the organisation creator');
            break;
          default:
            toast.error('Failed to remove team member');
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
            Are you sure you want to remove{' '}
            <span className="!h-0 flex items-center gap-1 font-medium text-foreground">
              <UserAvatar className="inline-block size-6" user={user} />
              {`${user.firstName} ${user.lastName}`}
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
