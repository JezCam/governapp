import type { DialogProps } from "@radix-ui/react-dialog";
import type { ActionsRowAction } from "@/dummy-data/actions";
import EditActionForm from "../forms/edit-action-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function EditActionDialog(
  props: DialogProps & { action: ActionsRowAction }
) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Action</DialogTitle>
          <DialogDescription>
            Edit action for {props.action.id}
          </DialogDescription>
        </DialogHeader>
        <EditActionForm
          formButtonProps={{ onPrevious: () => props.onOpenChange?.(false) }}
          onSuccess={() => props.onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
