import type { AppButtonVariant } from '../../actions/types/app-button.types';

export type AppDialogProps = {
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: AppButtonVariant;
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
};
