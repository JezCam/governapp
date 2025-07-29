import type { DialogProps } from '@radix-ui/react-dialog';
import type { ColumnDef } from '@tanstack/react-table';
import type { Assessment, UserAssessment } from '@/dummy-data/assessments';
import { DataTable } from '../data-table/data-table';
import FrameworkLabel from '../labels/framework-label';
import UserLabel from '../labels/user-label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';

const participantsTableColumns: ColumnDef<UserAssessment>[] = [
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
  ...props
}: DialogProps & { assessment: Assessment }) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent className="gap-6">
        <DialogHeader>
          <DialogTitle>{props.assessment.name}</DialogTitle>
        </DialogHeader>
        <FrameworkLabel name={props.assessment.framework} variant="framework" />
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
        <Separator />
        <DataTable
          //   actionOnClick={() => {}}
          //   actionText="Add participant"
          columns={participantsTableColumns}
          data={props.assessment.userAssessments}
          title="Participants"
        />
      </DialogContent>
    </Dialog>
  );
}
