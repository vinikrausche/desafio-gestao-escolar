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

import { AppButton } from '../actions/app-button';
import type { AppDialogProps } from './types/app-dialog.types';
import { appDialogStyles as styles } from './app-dialog.styles';

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
    <AlertDialog
      animationPreset="fade"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      style={styles.root}
      useRNModal
    >
      <AlertDialogBackdrop style={styles.backdrop} />

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
