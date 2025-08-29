import type { DialogProps } from '@radix-ui/react-dialog';
import type { ColumnDef } from '@tanstack/react-table';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import type {
  AssessmentTableRow,
  UserAssessmentWithUser,
} from '@/types/convex';
import { api } from '../../../convex/_generated/api';
import DeleteAssessmentButton from '../assessments/delete-assessment-button';
import { DataTable } from '../data-table/data-table';
import FrameworkLabel from '../labels/framework-label';
import UserLabel from '../labels/user-label';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';

const participantsTableColumns: ColumnDef<UserAssessmentWithUser>[] = [
  {
    size: 60,
    maxSize: 60,
    accessorKey: 'user',
    header: 'Name',
    cell: ({ row }) => {
      return <UserLabel user={row.original.user} />;
    },
  },
  {
    size: 40,
    maxSize: 40,
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={status} />;
    },
  },
];

export default function AssessmentDetailsDialog({
  assessment,
  isAdmin,
  ...rest
}: DialogProps & {
  assessment: AssessmentTableRow;
  isAdmin: boolean;
}) {
  const randomCompleteForTesting = useMutation(
    api.services.assessments.randomCompleteForTesting
  );

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  return (
    <Dialog onOpenChange={rest.onOpenChange} open={rest.open}>
      <DialogContent className="gap-6">
        <DialogHeader>
          <DialogTitle>{assessment.name}</DialogTitle>
        </DialogHeader>
        <FrameworkLabel name={assessment.framework.name} variant="framework" />
        {assessment.status === 'completed' && (
          <div className="flex w-full gap-4">
            <div className="flex w-full flex-col gap-1.5">
              <Label>Score</Label>
              <div className="flex w-full items-center gap-2">
                <Progress value={62} />
                <span className="font-medium text-sm">62%</span>
              </div>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col gap-1.5">
              <Label>Risk Level</Label>
              <Badge variant="amber" />
            </div>
          </div>
        )}
        {assessment.type === 'board' && (
          <DataTable
            //   actionOnClick={() => {}}
            //   actionText="Add participant"
            columns={participantsTableColumns}
            data={assessment.userAssessments}
            title="Participants"
          />
        )}
        {(isAdmin || assessment.type === 'self') && (
          <>
            <Separator />
            <div className="flex items-center justify-between">
              {deleteConfirm ? (
                <>
                  <strong className="text-sm">
                    Are you sure? This action can NOT be undone.
                  </strong>
                  <DeleteAssessmentButton
                    assessmentId={assessment._id}
                    onSuccess={() => rest.onOpenChange?.(false)}
                  >
                    Yes, delete
                  </DeleteAssessmentButton>
                </>
              ) : (
                <Button
                  className="w-fit justify-self-end"
                  onClick={() => setDeleteConfirm(true)}
                  size="sm"
                  variant="destructive"
                >
                  Delete assessment
                </Button>
              )}
            </div>
          </>
        )}
        <Button
          className="w-fit"
          onClick={() =>
            randomCompleteForTesting({ assessmentId: assessment._id })
          }
          size="sm"
          variant="ghost"
        >
          Random complete for testing
        </Button>
      </DialogContent>
    </Dialog>
  );
}
