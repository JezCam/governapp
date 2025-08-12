import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '@/lib/utils';
import { LoadingButton } from '../loading-button';
import type { FormButtonProps } from './types';

export default function FormButtons(props: FormButtonProps) {
  return (
    <div className={cn('mt-4 flex size-full items-end', props.className)}>
      {props.onPrevious && (
        <LoadingButton
          disabled={props.submitLoading}
          isLoading={props.previousLoading}
          onClick={props.onPrevious}
          type="button"
          variant="secondary"
        >
          {props.previousText || 'Back'}
        </LoadingButton>
      )}
      <LoadingButton
        className="ml-auto"
        disabled={props.previousLoading}
        isLoading={props.submitLoading}
        onClick={props.onSubmit}
        type="submit"
        variant={props.submitDestructive ? 'destructive' : 'default'}
      >
        {props.submitText || 'Submit'}
        {props.submitIcon && (
          <HugeiconsIcon icon={props.submitIcon} strokeWidth={2} />
        )}
      </LoadingButton>
    </div>
  );
}
