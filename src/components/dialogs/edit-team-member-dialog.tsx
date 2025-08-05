import type { DialogProps } from '@radix-ui/react-dialog';
import EditTeamMemberDetailsForm from '../forms/edit-team-member-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

// import UserAvatar from '../user-avatar';

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
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            Edit the details of
            <span className="!h-0 flex items-center gap-1 font-medium">
              {/* <UserAvatar className="inline-block size-6" user={props.user} /> */}
              {props.user.name}
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
