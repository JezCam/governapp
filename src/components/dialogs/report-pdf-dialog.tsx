import type { DialogProps } from '@radix-ui/react-dialog';
import { PDFViewer } from '@react-pdf/renderer';
import ReportPDF from '@/app/dashboard/reports/report-pdf';
import type { ReportRowAssessment } from '../../../convex/services/assessments';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export default function ReportPDFDialog(
  props: DialogProps & { assessmentReportRow?: ReportRowAssessment }
) {
  if (!props.assessmentReportRow) {
    return null; // TODO: Placeholder or loading state
  }

  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.open}>
      <DialogContent className="h-fit min-w-3xl">
        <DialogHeader>
          <DialogTitle>Report PDF</DialogTitle>
        </DialogHeader>
        <PDFViewer className="w-full rounded-md border" height={800}>
          <ReportPDF assessmentReportRow={props.assessmentReportRow} />
        </PDFViewer>
      </DialogContent>
    </Dialog>
  );
}
