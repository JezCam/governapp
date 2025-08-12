import type { DialogProps } from '@radix-ui/react-dialog';
import type { DataModel } from '../../../convex/_generated/dataModel';
// import UserDetailsForm from '../forms/user-details-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function EditTeamMemberDialog(
  props: DialogProps & { user: DataModel['users']['document'] }
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
        {/* <UserDetailsForm onSuccess={() => props.onOpenChange?.(false)} /> */}
      </DialogContent>
    </Dialog>
  );
}
