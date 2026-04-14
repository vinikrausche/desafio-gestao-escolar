import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Heading,
  Text,
} from '@gluestack-ui/themed';

import { AppButton, type AppButtonVariant } from '../actions/app-button';
import { appDialogStyles as styles } from './app-dialog.styles';

type AppDialogProps = {
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: AppButtonVariant;
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
};

export function AppDialog({
  cancelLabel = 'Cancelar',
  confirmLabel,
  confirmVariant = 'primary',
  isOpen,
  message,
  onClose,
  onConfirm,
  title,
}: AppDialogProps) {
  const primaryActionLabel =
    confirmLabel ?? (onConfirm ? 'Confirmar' : 'Fechar');

  return (
    <AlertDialog closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />

      <AlertDialogContent style={styles.content}>
        <AlertDialogHeader style={styles.header}>
          <Heading style={styles.title}>{title}</Heading>
        </AlertDialogHeader>

        <AlertDialogBody style={styles.body}>
          <Text style={styles.message}>{message}</Text>
        </AlertDialogBody>

        <AlertDialogFooter style={styles.footer}>
          {onConfirm ? (
            <AppButton
              align="start"
              label={cancelLabel}
              onPress={onClose}
              size="sm"
              variant="secondary"
            />
          ) : null}

          <AppButton
            align="start"
            label={primaryActionLabel}
            onPress={onConfirm ?? onClose}
            size="sm"
            variant={confirmVariant}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
