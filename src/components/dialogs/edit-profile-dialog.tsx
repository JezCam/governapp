import type { DialogProps } from '@radix-ui/react-dialog';
import type { User } from '@/types/convex';
import UserDetailsForm from '../forms/user-details-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function EditProfileDialog(props: DialogProps & { user: User }) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            Edit your profile details
          </DialogDescription>
        </DialogHeader>
        <UserDetailsForm user={props.user} />
      </DialogContent>
    </Dialog>
  );
}
