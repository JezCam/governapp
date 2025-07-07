import type { DialogProps } from '@radix-ui/react-dialog';
import DeleteAccountForm from '../forms/delete-account-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function ConfirmDeleteAccountDialog(props: DialogProps) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account?
          </DialogDescription>
        </DialogHeader>
        <DeleteAccountForm
          formButtonProps={{ onPrevious: () => props.onOpenChange?.(false) }}
          onSuccess={() => props.onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
