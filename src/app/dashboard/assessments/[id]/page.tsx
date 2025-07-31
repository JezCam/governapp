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
          <h1 className="shrink-0 font-bold">Assessment Name {id}</h1>
          <div className="flex w-full justify-end">
            <Button size="sm" variant="outline">
              Save & exit
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
