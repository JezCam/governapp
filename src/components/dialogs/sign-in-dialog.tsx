import type { DialogProps } from '@radix-ui/react-dialog';
import SignInForm from '../forms/sign-in-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export default function SignInDialog(props: DialogProps) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
