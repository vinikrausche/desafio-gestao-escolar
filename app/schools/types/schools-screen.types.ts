import type { AppButtonVariant } from '../../../src/components/actions/types/app-button.types';

export type DialogState = {
  confirmLabel?: string;
  confirmVariant?: AppButtonVariant;
  isOpen: boolean;
  message: string;
  onConfirm?: () => void;
  title: string;
};
