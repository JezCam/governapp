import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, Tick01Icon } from '@hugeicons-pro/core-stroke-rounded';
import type { Invitation, Organisation, User } from '@/types/convex';
import OrganisationAvatar from './avatars/organisation-avatar';
import AcceptInvitationButton from './convex/invitations/accept-invitation-button';
import DeclineInvitationButton from './convex/invitations/decline-invitation-button';
import UserLabel from './labels/user-label';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export default function InvitationCard({
  invitation,
  onAccept,
}: {
  invitation: Invitation & {
    organisation: Organisation;
    invitedByUser: User;
  };
  onAccept?: () => void;
}) {
  const invitationId = invitation._id;
  const organisation = invitation.organisation;
  const invitedByUser = invitation.invitedByUser;

  return (
    <Card className="flex w-full flex-col gap-3 p-2 shadow-xs">
      <div className="flex items-center gap-1 px-2 pt-1 text-muted-foreground text-sm">
        From
        <UserLabel className="ml-0.5" user={invitedByUser} />(
        {invitedByUser.email})
      </div>
      <div className="flex items-center justify-between gap-2 rounded-sm bg-accent p-2">
        <div className="flex min-w-0 items-center gap-2">
          <OrganisationAvatar className="size-9" organisation={organisation} />
          <strong className="truncate">{organisation.name}</strong>
        </div>
        {/* Invitation actions */}
        <div className="flex gap-2">
          <TooltipProvider>
            <Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button size="icon" variant="outline">
                      <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>Decline invitation</TooltipContent>
              </Tooltip>
              <PopoverContent
                className="flex w-fit flex-col gap-2 p-3 "
                side="top"
              >
                <strong className="text-sm">Are you sure?</strong>
                <DeclineInvitationButton
                  invitationId={invitationId}
                  size="sm"
                  variant="destructive"
                >
                  Yes, decline
                </DeclineInvitationButton>
              </PopoverContent>
            </Popover>

            <Tooltip>
              <TooltipTrigger asChild>
                <AcceptInvitationButton
                  className="group"
                  invitationId={invitationId}
                  onSuccess={onAccept}
                  size="icon"
                >
                  <HugeiconsIcon
                    className="group-disabled:hidden"
                    icon={Tick01Icon}
                    strokeWidth={2}
                  />
                </AcceptInvitationButton>
              </TooltipTrigger>
              <TooltipContent>Accept invitation</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
}
