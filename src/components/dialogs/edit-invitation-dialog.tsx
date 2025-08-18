import type { DialogProps } from '@radix-ui/react-dialog';
import type { Invitation } from '@/types/convex';
import EditInvitationForm from '../forms/edit-invitation-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function EditInvitationDialog(
  props: DialogProps & { invitation: Invitation }
) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Invitation</DialogTitle>
          <DialogDescription>
            Edit the invitation to {props.invitation.inviteeEmail}
          </DialogDescription>
        </DialogHeader>
        <EditInvitationForm
          formButtonProps={{ onPrevious: () => props.onOpenChange?.(false) }}
          invitation={props.invitation}
          onSuccess={() => props.onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
