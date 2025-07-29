import type { DialogProps } from "@radix-ui/react-dialog";
import type { ActionsRowAction } from "@/dummy-data/actions";
import EditActionForm from "../forms/edit-action-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function EditActionDialog(
  props: DialogProps & { action?: ActionsRowAction }
) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Action</DialogTitle>
        </DialogHeader>
        <p className="max-h-40 overflow-auto rounded-md border border-ga-purple-300 bg-ga-purple-100 p-2 text-sm dark:border-ga-purple-800 dark:bg-ga-purple-950">
          {props.action?.text}
        </p>
        <EditActionForm
          formButtonProps={{ onPrevious: () => props.onOpenChange?.(false) }}
          onSuccess={() => props.onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
