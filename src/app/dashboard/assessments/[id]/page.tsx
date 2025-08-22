import Link from 'next/link';
import QuestionForm from '@/components/forms/question-form';
import FrameworkLabel from '@/components/labels/framework-label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ProgressTree from './progress-tree';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex size-full flex-col">
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-4">
          <div className="w-full">
            <FrameworkLabel name="Assessment Name" variant="framework" />
          </div>
          <h1
            className="shrink-0 font-bold text-lg"
            style={{ fontFamily: 'var(--font-m-plus-rounded-1c' }}
          >
            Assessment Name {id}
          </h1>
          <div className="flex w-full justify-end">
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard/assessments">Save & exit</Link>
            </Button>
          </div>
        </div>
        <Progress className="rounded-none" value={50} />
      </div>
      <div className="flex size-full overflow-auto">
        <ProgressTree />
        <QuestionForm />
      </div>
    </div>
  );
}
