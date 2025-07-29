import type { HugeiconsIconProps } from '@hugeicons/react';

export type FormButtonProps = {
  onPrevious?: () => void;
  previousText?: string;
  submitText?: string;
  submitIcon?: HugeiconsIconProps['icon'];
  submitDestructive?: boolean;
  isLoading?: boolean;
  className?: string;
};

export type FormProps = {
  formButtonProps?: FormButtonProps;
  onSuccess?: () => void;
};
