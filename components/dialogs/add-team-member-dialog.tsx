import type { DialogProps } from '@radix-ui/react-dialog';
import AddTeamMemberForm from '../forms/add-team-member-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export default function AddTeamMemberDialog({ ...props }: DialogProps) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Team Member</DialogTitle>
        </DialogHeader>
        <AddTeamMemberForm onSuccess={() => props.onOpenChange?.(false)} />
      </DialogContent>
    </Dialog>
  );
}
