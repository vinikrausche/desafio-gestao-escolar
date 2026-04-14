import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithUi } from '../../test-utils/render-with-ui';
import { SearchFilterPanel } from './search-filter-panel';

const filterOptions = [
  {
    label: 'Todas',
    value: 'all',
  },
  {
    label: 'Com turmas',
    value: 'with-classrooms',
  },
] as const;

describe('SearchFilterPanel', () => {
  it('dispara busca e troca de filtro pela interface', () => {
    const onClear = jest.fn();
    const onFilterChange = jest.fn();
    const onSearchChange = jest.fn();

    renderWithUi(
      <SearchFilterPanel
        defaultFilterValue="all"
        filterLabel="Filtrar por situação"
        filterOptions={filterOptions}
        filterValue="all"
        onClear={onClear}
        onFilterChange={onFilterChange}
        onSearchChange={onSearchChange}
        searchLabel="Buscar escola"
        searchPlaceholder="Digite o nome da escola"
        searchValue=""
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Digite o nome da escola'),
      'Centro',
    );
    fireEvent.press(screen.getByText('Com turmas'));

    expect(onSearchChange).toHaveBeenCalledWith('Centro');
    expect(onFilterChange).toHaveBeenCalledWith('with-classrooms');
    expect(onClear).not.toHaveBeenCalled();
  });

  it('mostra o botao de limpar apenas quando ha filtro ativo', () => {
    const onClear = jest.fn();

    const { queryByText, rerender } = renderWithUi(
      <SearchFilterPanel
        defaultFilterValue="all"
        filterLabel="Filtrar por situação"
        filterOptions={filterOptions}
        filterValue="all"
        onClear={onClear}
        onFilterChange={jest.fn()}
        onSearchChange={jest.fn()}
        searchLabel="Buscar escola"
        searchPlaceholder="Digite o nome da escola"
        searchValue=""
      />,
    );

    expect(queryByText('Limpar filtros')).toBeNull();

    rerender(
      <SearchFilterPanel
        defaultFilterValue="all"
        filterLabel="Filtrar por situação"
        filterOptions={filterOptions}
        filterValue="with-classrooms"
        onClear={onClear}
        onFilterChange={jest.fn()}
        onSearchChange={jest.fn()}
        searchLabel="Buscar escola"
        searchPlaceholder="Digite o nome da escola"
        searchValue="Centro"
      />,
    );

    fireEvent.press(screen.getByText('Limpar filtros'));

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
