import { Alert, Platform } from 'react-native';

import { confirmAction } from './confirm-action';

function setPlatformOs(value: 'android' | 'ios' | 'web') {
  Object.defineProperty(Platform, 'OS', {
    configurable: true,
    value,
  });
}

describe('confirmAction', () => {
  const originalPlatformOs = Platform.OS;
  const originalConfirm = globalThis.confirm;

  afterEach(() => {
    Object.defineProperty(Platform, 'OS', {
      configurable: true,
      value: originalPlatformOs,
    });

    globalThis.confirm = originalConfirm;
  });

  it('usa confirm no navegador e executa a acao quando o usuario confirma', () => {
    const onConfirm = jest.fn();
    const confirmSpy = jest.fn(() => true);

    setPlatformOs('web');
    globalThis.confirm = confirmSpy;

    confirmAction({
      message: 'Deseja excluir a turma "6º Ano A"?',
      onConfirm,
      title: 'Excluir turma',
    });

    expect(confirmSpy).toHaveBeenCalledWith(
      'Excluir turma\n\nDeseja excluir a turma "6º Ano A"?',
    );
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('nao executa a acao no navegador quando o usuario cancela', () => {
    const onConfirm = jest.fn();

    setPlatformOs('web');
    globalThis.confirm = jest.fn(() => false);

    confirmAction({
      message: 'Deseja excluir a escola "Centro"?',
      onConfirm,
      title: 'Excluir escola',
    });

    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('mantem o Alert.alert com botoes no mobile', () => {
    const onConfirm = jest.fn();
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

    setPlatformOs('android');

    confirmAction({
      confirmLabel: 'Excluir',
      message: 'Deseja excluir a escola "Centro"?',
      onConfirm,
      title: 'Excluir escola',
    });

    expect(alertSpy).toHaveBeenCalledWith(
      'Excluir escola',
      'Deseja excluir a escola "Centro"?',
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          onPress: expect.any(Function),
          style: 'destructive',
          text: 'Excluir',
        },
      ],
    );

    const alertButtons = alertSpy.mock.calls[0]?.[2];
    const confirmButton = Array.isArray(alertButtons) ? alertButtons[1] : null;

    if (confirmButton?.onPress) {
      confirmButton.onPress();
    }

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
