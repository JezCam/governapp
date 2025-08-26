import { HugeiconsIcon } from '@hugeicons/react';
import { TaskDone02Icon } from '@hugeicons-pro/core-stroke-rounded';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { api } from '../../../../../convex/_generated/api';
import type { Id } from '../../../../../convex/_generated/dataModel';

export default function CompleteCard({
  userAssessmentId,
  onPrevious,
}: {
  userAssessmentId: Id<'userAssessments'>;
  onPrevious: () => void;
}) {
  const completeAssessment = useMutation(api.services.userAssessments.complete);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setIsLoading(true);
    completeAssessment({
      userAssessmentId,
    })
      .then(() => {
        toast.success('Assessment completed');
        // Redirect to assessments page
        router.replace('/dashboard/assessments');
      })
      .catch((error) => {
        switch (error.data) {
          case 'USER_ASSESSMENT_NOT_FOUND':
            toast.error('User assessment not found. Please refresh the page.');
            break;
          default:
            toast.error('An unexpected error occurred. Please try again.');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-ga-purple-100 dark:bg-ga-purple-950">
        <HugeiconsIcon
          className="size-8 text-ga-purple-600 dark:text-ga-purple-400"
          icon={TaskDone02Icon}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-semibold text-lg">Assessment finished</span>
        <p className="max-w-sm text-center text-muted-foreground">
          You have completed all the questions in this assessment. If you
          complete the assessment, you will not be able to return to change your
          answers.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          className="mt-6"
          disabled={isLoading}
          onClick={onPrevious}
          size="lg"
          variant="secondary"
        >
          Previous
        </Button>
        <LoadingButton
          className="mt-6"
          isLoading={isLoading}
          onClick={handleComplete}
          size="lg"
        >
          Complete
        </LoadingButton>
      </div>
    </div>
  );
}
