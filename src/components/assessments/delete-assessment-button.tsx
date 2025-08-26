import { useMutation } from 'convex/react';
import { type ReactNode, useState } from 'react';
import { toast } from 'sonner';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';
import LoadingButton from '../loading-button';

export default function DeleteAssessmentButton({
  assessmentId,
  onSuccess,
  children,
}: {
  assessmentId: Id<'assessments'>;
  onSuccess?: () => void;
  children: ReactNode;
}) {
  const deleteAssessment = useMutation(api.services.assessments.deleteById);

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = () => {
    setIsLoading(true);
    deleteAssessment({ assessmentId })
      .then(() => {
        toast.success('Assessment deleted');
        onSuccess?.();
      })
      .catch(() => {
        toast.error('Failed to delete assessment, please try again');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <LoadingButton
      isLoading={isLoading}
      onClick={onDelete}
      size="sm"
      variant="destructive"
    >
      {children}
    </LoadingButton>
  );
}
