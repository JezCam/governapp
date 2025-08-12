'use client';

import type { DialogProps } from '@radix-ui/react-dialog';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import OrganisationAvatar from '../avatars/organisation-avatar';
import AddTeamMemberForm from '../forms/add-team-member-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function AddTeamMemberDialog({ ...props }: DialogProps) {
  const activeOrganisation = useQuery(api.services.organisations.getActive);

  if (activeOrganisation === undefined) {
    return null; // TODO: Add skeletons for active organisation = undefined
  }

  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Team Member</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            Invite a new team member to
            <span className="flex items-center gap-1">
              <OrganisationAvatar
                className="inline-block size-6"
                organisation={activeOrganisation}
              />
              <strong>{activeOrganisation.name}</strong>
            </span>
          </DialogDescription>
        </DialogHeader>
        <AddTeamMemberForm onSuccess={() => props.onOpenChange?.(false)} />
      </DialogContent>
    </Dialog>
  );
}
