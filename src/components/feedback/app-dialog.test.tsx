import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../test-utils/render-with-ui';
import { AppDialog } from './app-dialog';

describe('AppDialog', () => {
  it('nao renderiza conteudo quando esta fechado', () => {
    renderWithUi(
      <AppDialog
        isOpen={false}
        message="Mensagem"
        onClose={jest.fn()}
        title="Titulo"
      />,
    );

    expect(screen.queryByText('Titulo')).toBeNull();
    expect(screen.queryByText('Mensagem')).toBeNull();
  });

  it('renderiza dialogo de confirmacao com acoes de cancelar e confirmar', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    renderWithUi(
      <AppDialog
        confirmLabel="Excluir"
        confirmVariant="dangerSoft"
        isOpen
        message="Deseja excluir a turma selecionada?"
        onClose={onClose}
        onConfirm={onConfirm}
        title="Excluir turma"
      />,
    );

    expect(screen.getByText('Excluir turma')).toBeTruthy();
    expect(
      screen.getByText('Deseja excluir a turma selecionada?'),
    ).toBeTruthy();

    fireEvent.press(screen.getByText('Cancelar'));
    fireEvent.press(screen.getByText('Excluir'));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('renderiza dialogo informativo com botao unico de fechar', () => {
    const onClose = jest.fn();

    renderWithUi(
      <AppDialog
        isOpen
        message="Nao foi possivel excluir a turma."
        onClose={onClose}
        title="Erro ao excluir"
      />,
    );

    fireEvent.press(screen.getByText('Fechar'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
