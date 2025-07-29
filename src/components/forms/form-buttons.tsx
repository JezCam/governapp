import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '@/lib/utils';
import { LoadingButton } from '../loading-button';
import { Button } from '../ui/button';
import type { FormButtonProps } from './types';

export default function FormButtons(props: FormButtonProps) {
  return (
    <div className={cn('mt-4 flex size-full items-end', props.className)}>
      {props.onPrevious && (
        <Button
          disabled={props.isLoading}
          onClick={props.onPrevious}
          type="button"
          variant="secondary"
        >
          {props.previousText || 'Back'}
        </Button>
      )}
      <LoadingButton
        className="ml-auto"
        isLoading={props.isLoading}
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
