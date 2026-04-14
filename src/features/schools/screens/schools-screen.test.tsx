import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';

import SchoolsScreen from '../../../../app/schools/index';
import type { SchoolSummary } from '../school.types';
import { useSchoolsStore } from '../store/schools.store';
import { renderWithUi } from '../../../test-utils/render-with-ui';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../components/layout/screen-shell', () => {
  return {
    ScreenShell: jest.requireActual('../../../test-utils/mock-screen-shell')
      .MockScreenShell,
  };
});

jest.mock('../store/schools.store', () => ({
  useSchoolsStore: jest.fn(),
}));

const schoolsFixture: SchoolSummary[] = [
  {
    address: 'Rua das Flores, 120',
    classrooms: [
      {
        id: 'classroom-1',
        name: '6º Ano A',
        schoolYear: '2026',
        shift: 'morning',
      },
    ],
    id: 'school-1',
    name: 'Escola Municipal Centro',
  },
  {
    address: 'Avenida Sul, 45',
    classrooms: [],
    id: 'school-2',
    name: 'Escola Municipal Sul',
  },
];

type MockSchoolsStoreState = {
  deleteSchool: jest.Mock;
  errorMessage: string | null;
  loadSchools: jest.Mock;
  schoolIds: string[];
  schoolsById: Record<string, SchoolSummary>;
  status: 'idle' | 'loading' | 'ready' | 'error';
};

function normalizeSchoolsState(schools: SchoolSummary[]) {
  return {
    schoolIds: schools.map((school) => school.id),
    schoolsById: Object.fromEntries(
      schools.map((school) => [school.id, school]),
    ) as Record<string, SchoolSummary>,
  };
}

function createStoreState(
  overrides: Partial<MockSchoolsStoreState> = {},
): MockSchoolsStoreState {
  const normalizedSchools = normalizeSchoolsState(schoolsFixture);

  return {
    deleteSchool: jest.fn().mockResolvedValue(undefined),
    errorMessage: null,
    loadSchools: jest.fn().mockResolvedValue(schoolsFixture),
    status: 'ready',
    ...normalizedSchools,
    ...overrides,
  };
}

describe('SchoolsScreen', () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();
  const mockBack = jest.fn();
  const mockedUseRouter = useRouter as jest.Mock;
  const mockedUseSchoolsStore = useSchoolsStore as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseRouter.mockReturnValue({
      back: mockBack,
      push: mockPush,
      replace: mockReplace,
    });
  });

  it('carrega a listagem e aplica busca com limpeza de filtros', async () => {
    const storeState = createStoreState();

    mockedUseSchoolsStore.mockImplementation((selector) =>
      selector(storeState),
    );

    renderWithUi(<SchoolsScreen />);

    await waitFor(() => {
      expect(storeState.loadSchools).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('Escola Municipal Centro')).toBeTruthy();
    expect(screen.getByText('Escola Municipal Sul')).toBeTruthy();

    fireEvent.changeText(screen.getByPlaceholderText(/Digite nome/i), 'Sul');

    expect(screen.queryByText('Escola Municipal Centro')).toBeNull();
    expect(screen.getByText('Escola Municipal Sul')).toBeTruthy();

    fireEvent.changeText(
      screen.getByPlaceholderText(/Digite nome/i),
      'Inexistente',
    );

    expect(
      screen.getByText('Nenhuma escola encontrada com os filtros informados.'),
    ).toBeTruthy();

    fireEvent.press(screen.getAllByText('Limpar filtros')[0]!);

    expect(screen.getByText('Escola Municipal Centro')).toBeTruthy();
    expect(screen.getByText('Escola Municipal Sul')).toBeTruthy();
  });

  it('abre o dialogo de exclusao e confirma a remocao da escola', async () => {
    const storeState = createStoreState({
      ...normalizeSchoolsState([schoolsFixture[0]!]),
      loadSchools: jest.fn().mockResolvedValue([schoolsFixture[0]!]),
    });

    mockedUseSchoolsStore.mockImplementation((selector) =>
      selector(storeState),
    );

    renderWithUi(<SchoolsScreen />);

    fireEvent.press(
      screen.getByLabelText('Excluir escola Escola Municipal Centro'),
    );

    expect(screen.getByText('Excluir escola')).toBeTruthy();

    fireEvent.press(screen.getByText('Excluir'));

    await waitFor(() => {
      expect(storeState.deleteSchool).toHaveBeenCalledWith('school-1');
    });
  });

  it('mostra erro e permite recarregar a listagem', async () => {
    const loadSchools = jest.fn().mockResolvedValue([]);
    const storeState = createStoreState({
      errorMessage: 'Falha ao carregar escolas.',
      loadSchools,
      schoolIds: [],
      schoolsById: {},
      status: 'error',
    });

    mockedUseSchoolsStore.mockImplementation((selector) =>
      selector(storeState),
    );

    renderWithUi(<SchoolsScreen />);

    await waitFor(() => {
      expect(loadSchools).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('Falha ao carregar')).toBeTruthy();
    expect(screen.getByText('Falha ao carregar escolas.')).toBeTruthy();

    fireEvent.press(screen.getByText('Tentar novamente'));

    expect(loadSchools).toHaveBeenNthCalledWith(2, { force: true });
  });
});
