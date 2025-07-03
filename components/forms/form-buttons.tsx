import { HugeiconsIcon } from '@hugeicons/react';
import { LoadingButton } from '../loading-button';
import { Button } from '../ui/button';
import type { FormButtonProps } from './types';

export default function FormButtons(props: FormButtonProps) {
  return (
    <div className="mt-4 flex h-full flex-1 items-end">
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
      >
        {props.submitText || 'Submit'}
        {props.submitIcon && (
          <HugeiconsIcon icon={props.submitIcon} strokeWidth={2} />
        )}
      </LoadingButton>
    </div>
  );
}
