import type { DialogProps } from '@radix-ui/react-dialog';
import SignInForm from '../forms/sign-in-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export default function SignInDialog(
  props: DialogProps & { redirectTo?: string; defaultEmail?: string }
) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <SignInForm
          defaultEmail={props.defaultEmail}
          redirectTo={props.redirectTo}
        />
      </DialogContent>
    </Dialog>
  );
}
