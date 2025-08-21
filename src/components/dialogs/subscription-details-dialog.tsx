import type { DialogProps } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export default function SubscriptionDetailsDialog(props: DialogProps) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscription Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-base">Unsubscribe from framework</h2>
            <p className="text-muted-foreground text-sm">
              You will still have access to the framework until the end of your
              current billing cycle. After that, you will need to re-subscribe
              to access it again.
            </p>
          </div>
          <Button className="w-fit" variant="destructive">
            Unsubscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
