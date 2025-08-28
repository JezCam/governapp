import type { DialogProps } from '@radix-ui/react-dialog';
import CreateSelfAssessmentForm from '../forms/create-self-assessment-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export default function CreateSelfAssessmentDialog(props: DialogProps) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Self Assessment</DialogTitle>
        </DialogHeader>
        <CreateSelfAssessmentForm
          formButtonProps={{ onPrevious: () => props.onOpenChange?.(false) }}
          onSuccess={() => props.onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
