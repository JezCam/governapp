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
          Previous
        </Button>
      )}
      <LoadingButton
        className="ml-auto"
        isLoading={props.isLoading}
        type="submit"
      >
        Submit
      </LoadingButton>
    </div>
  );
}
