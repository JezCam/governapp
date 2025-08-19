import type { DialogProps } from '@radix-ui/react-dialog';
import type { Membership, User } from '@/types/convex';
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
  props: DialogProps & { membership: Membership & { user: User } }
) {
  const user = props.membership.user;

  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            Edit the details of
            <span className="!h-0 flex items-center gap-1 font-medium">
              <UserAvatar className="inline-block size-6" user={user} />
              {`${user.firstName} ${user.lastName}`}
            </span>
          </DialogDescription>
        </DialogHeader>
        <EditTeamMemberDetailsForm
          formButtonProps={{ submitText: 'Update' }}
          membership={props.membership}
          onSuccess={() => props.onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
