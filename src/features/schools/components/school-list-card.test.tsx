import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../../test-utils/render-with-ui';
import { SchoolListCard } from './school-list-card';

describe('SchoolListCard', () => {
  it('renderiza os dados da escola e dispara as acoes do card', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onManageClassrooms = jest.fn();

    renderWithUi(
      <SchoolListCard
        onDelete={onDelete}
        onEdit={onEdit}
        onManageClassrooms={onManageClassrooms}
        school={{
          address: 'Rua das Flores, 120',
          classrooms: [
            {
              id: 'classroom-1',
              name: '6º Ano A',
              schoolYear: '2026',
              shift: 'morning',
            },
            {
              id: 'classroom-2',
              name: '6º Ano B',
              schoolYear: '2026',
              shift: 'afternoon',
            },
          ],
          id: 'school-1',
          name: 'Escola Municipal Centro',
        }}
      />,
    );

    expect(screen.getByText('Escola Municipal Centro')).toBeTruthy();
    expect(screen.getByText('Rua das Flores, 120')).toBeTruthy();
    expect(screen.getByText('2 turmas')).toBeTruthy();
    expect(screen.getByText('6º Ano A, 6º Ano B')).toBeTruthy();

    fireEvent.press(screen.getByText('Gerenciar turmas'));
    fireEvent.press(
      screen.getByLabelText('Editar escola Escola Municipal Centro'),
    );
    fireEvent.press(
      screen.getByLabelText('Excluir escola Escola Municipal Centro'),
    );

    expect(onManageClassrooms).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
