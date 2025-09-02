import Link from 'next/link';
import FrameworkLabel from '@/components/labels/framework-label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function AssessmentHeader({
  frameworkName,
  assessmentName,
  questionIndex,
  questionsTotal,
  completed,
}: {
  frameworkName: string;
  assessmentName: string;
  questionIndex: number;
  questionsTotal: number;
  completed: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-4">
        <div className="w-full">
          <FrameworkLabel name={frameworkName} variant="framework" />
        </div>
        <h1 className="shrink-0 font-bold text-lg">{assessmentName}</h1>
        <div className="flex w-full justify-end">
          <Button asChild size="sm" variant="outline">
            <Link href="/dashboard/assessments">Save & exit</Link>
          </Button>
        </div>
      </div>
      <Progress
        className="rounded-none"
        value={
          ((completed ? questionsTotal : questionIndex) / questionsTotal) * 100
        }
      />
    </div>
  );
}
