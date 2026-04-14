import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../../test-utils/render-with-ui';
import { ClassroomListCard } from './classroom-list-card';

describe('ClassroomListCard', () => {
  it('renderiza a turma e executa as acoes disponiveis', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    renderWithUi(
      <ClassroomListCard
        classroom={{
          id: 'classroom-1',
          name: '7º Ano A',
          schoolYear: '2027',
          shift: 'night',
        }}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    expect(screen.getByText('7º Ano A')).toBeTruthy();
    expect(screen.getByText('Noite')).toBeTruthy();
    expect(screen.getByText('Ano letivo 2027')).toBeTruthy();
    expect(screen.getByText('Turno noite • Ano 2027')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Editar turma 7º Ano A'));
    fireEvent.press(screen.getByLabelText('Excluir turma 7º Ano A'));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
