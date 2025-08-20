import type { HugeiconsIconProps } from '@hugeicons/react';

export type FormButtonProps = {
  onPrevious?: () => void;
  previousText?: string;
  previousLoading?: boolean;
  onSubmit?: () => void;
  submitText?: string;
  submitIcon?: HugeiconsIconProps['icon'];
  submitDestructive?: boolean;
  submitLoading?: boolean;
  className?: string;
};

export type FormProps = {
  formButtonProps?: FormButtonProps;
  redirectOnSuccess?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
};
