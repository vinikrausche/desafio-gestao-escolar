import { Alert, Platform } from 'react-native';

type ConfirmActionParams = {
  confirmLabel?: string;
  message: string;
  onConfirm: () => void;
  title: string;
};

export function confirmAction({
  confirmLabel = 'Confirmar',
  message,
  onConfirm,
  title,
}: ConfirmActionParams) {
  if (Platform.OS === 'web') {
    // O Alert do React Native Web nao expõe botoes de acao como no mobile.
    const confirmMessage = `${title}\n\n${message}`;
    const shouldConfirm =
      typeof globalThis.confirm === 'function'
        ? globalThis.confirm(confirmMessage)
        : true;

    if (shouldConfirm) {
      onConfirm();
    }

    return;
  }

  Alert.alert(title, message, [
    {
      style: 'cancel',
      text: 'Cancelar',
    },
    {
      style: 'destructive',
      text: confirmLabel,
      onPress: () => {
        onConfirm();
      },
    },
  ]);
}
