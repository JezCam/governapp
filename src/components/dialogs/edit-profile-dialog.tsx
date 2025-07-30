import type { DialogProps } from '@radix-ui/react-dialog';
import UserDetailsForm from '../forms/user-details-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

type User = {
  name: string;
  imageUrl?: string;
};

export default function EditTeamMemberDialog(
  props: DialogProps & { user: User }
) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            Edit your profile details
          </DialogDescription>
        </DialogHeader>
        <UserDetailsForm onSuccess={() => props.onOpenChange?.(false)} />
      </DialogContent>
    </Dialog>
  );
}
