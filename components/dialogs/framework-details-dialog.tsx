import type { DialogProps } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export default function FrameworkDetailsDialog(props: DialogProps) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Framework Details</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
