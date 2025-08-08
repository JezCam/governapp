import type { DialogProps } from '@radix-ui/react-dialog';
import type { DataModel } from '../../../convex/_generated/dataModel';
import UserAvatar from '../avatars/user-avatar';
import EditTeamMemberDetailsForm from '../forms/edit-team-member-form';
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
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            Edit the details of
            <span className="!h-0 flex items-center gap-1 font-medium">
              <UserAvatar className="inline-block size-6" user={props.user} />
              {`${props.user.firstName} ${props.user.lastName}`}
            </span>
          </DialogDescription>
        </DialogHeader>
        <EditTeamMemberDetailsForm
          formButtonProps={{ onPrevious: () => props.onOpenChange?.(false) }}
          onSuccess={() => props.onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
