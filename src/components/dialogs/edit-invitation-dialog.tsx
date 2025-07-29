import type { DialogProps } from '@radix-ui/react-dialog';
import EditInvitationForm from '../forms/edit-invitation-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

type Invitation = {
  email: string;
  role: string;
  permission: 'admin' | 'member';
};

export default function EditInvitationDialog(
  props: DialogProps & { invitation: Invitation }
) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Invitation</DialogTitle>
          <DialogDescription>
            Edit the invitation to {props.invitation.email}
          </DialogDescription>
        </DialogHeader>
        <EditInvitationForm
          formButtonProps={{ onPrevious: () => props.onOpenChange?.(false) }}
          onSuccess={() => props.onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
