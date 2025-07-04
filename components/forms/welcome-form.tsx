import { useState } from 'react';
import { LoadingButton } from '../loading-button';
import type { FormProps } from './types';

export default function WelcomeForm(props: Pick<FormProps, 'onSuccess'>) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    props.onSuccess?.();
  };

  return (
    <LoadingButton
      className="ml-auto"
      isLoading={isLoading}
      onClick={handleClick}
      type="submit"
    >
      Begin
    </LoadingButton>
  );
}
