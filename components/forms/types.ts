export type FormProps = {
  onPrevious?: () => void;
  onSuccess: () => void;
};

export type FormButtonProps = {
  onPrevious?: () => void;
  previousText?: string;
  submitText?: string;
  isLoading?: boolean;
};
