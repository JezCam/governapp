import type { HugeiconsIconProps } from '@hugeicons/react';

export type FormProps = {
  onPrevious?: () => void;
  onSuccess: () => void;
};

export type FormButtonProps = {
  onPrevious?: () => void;
  previousText?: string;
  submitText?: string;
  submitIcon?: HugeiconsIconProps['icon'];
  isLoading?: boolean;
};
