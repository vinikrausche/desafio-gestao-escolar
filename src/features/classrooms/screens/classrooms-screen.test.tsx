import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ClassroomsScreen from '../../../../app/schools/[schoolId]/classrooms/index';
import type { SchoolSummary } from '../../schools/school.types';
import { useSchoolResource } from '../../schools/hooks/use-school-resource';
import { useSchoolsStore } from '../../schools/store/schools.store';
import { renderWithUi } from '../../../test-utils/render-with-ui';

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('../../../components/layout/screen-shell', () => {
  return {
    ScreenShell: jest.requireActual('../../../test-utils/mock-screen-shell')
      .MockScreenShell,
  };
});

jest.mock('../../schools/hooks/use-school-resource', () => ({
  useSchoolResource: jest.fn(),
}));

jest.mock('../../schools/store/schools.store', () => ({
  useSchoolsStore: jest.fn(),
}));

const schoolFixture: SchoolSummary = {
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
      name: '7º Ano B',
      schoolYear: '2027',
      shift: 'night',
    },
  ],
  id: 'school-1',
  name: 'Escola Municipal Centro',
};

type MockSchoolResourceState = {
  errorMessage: string | null;
  hasSchoolLoadError: boolean;
  isLoadingSchool: boolean;
  isSchoolMissing: boolean;
  refreshSchool: jest.Mock;
  school?: SchoolSummary;
};

function createSchoolResourceState(
  overrides: Partial<MockSchoolResourceState> = {},
): MockSchoolResourceState {
  return {
    errorMessage: null,
    hasSchoolLoadError: false,
    isLoadingSchool: false,
    isSchoolMissing: false,
    refreshSchool: jest.fn().mockResolvedValue(undefined),
    school: schoolFixture,
    ...overrides,
  };
}

describe('ClassroomsScreen', () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();
  const mockBack = jest.fn();
  const mockDeleteClassroom = jest.fn().mockResolvedValue(undefined);
  const mockedUseLocalSearchParams = useLocalSearchParams as jest.Mock;
  const mockedUseRouter = useRouter as jest.Mock;
  const mockedUseSchoolResource = useSchoolResource as jest.Mock;
  const mockedUseSchoolsStore = useSchoolsStore as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseLocalSearchParams.mockReturnValue({
      schoolId: 'school-1',
    });

    mockedUseRouter.mockReturnValue({
      back: mockBack,
      push: mockPush,
      replace: mockReplace,
    });

    mockedUseSchoolsStore.mockImplementation((selector) =>
      selector({
        deleteClassroom: mockDeleteClassroom,
      }),
    );
  });

  it('renderiza a escola, aplica filtro e confirma a exclusao da turma', async () => {
    mockedUseSchoolResource.mockReturnValue(createSchoolResourceState());

    renderWithUi(<ClassroomsScreen />);

    expect(screen.getByText('Escola Municipal Centro')).toBeTruthy();
    expect(screen.getByText('Rua das Flores, 120')).toBeTruthy();
    expect(screen.getByText('6º Ano A')).toBeTruthy();
    expect(screen.getByText('7º Ano B')).toBeTruthy();

    fireEvent.press(screen.getAllByText('Noite')[0]!);

    expect(screen.queryByText('6º Ano A')).toBeNull();
    expect(screen.getByText('7º Ano B')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Excluir turma 7º Ano B'));

    expect(screen.getByText('Excluir turma')).toBeTruthy();

    fireEvent.press(screen.getByText('Excluir'));

    await waitFor(() => {
      expect(mockDeleteClassroom).toHaveBeenCalledWith(
        'school-1',
        'classroom-2',
      );
    });
  });

  it('permite voltar para a listagem de escolas quando a escola nao existe', () => {
    mockedUseSchoolResource.mockReturnValue(
      createSchoolResourceState({
        isSchoolMissing: true,
        school: undefined,
      }),
    );

    renderWithUi(<ClassroomsScreen />);

    expect(screen.getByText('Escola nao encontrada.')).toBeTruthy();

    fireEvent.press(screen.getByText('Voltar para escolas'));

    expect(mockReplace).toHaveBeenCalledWith('/schools');
  });

  it('mostra erro e permite recarregar as turmas da escola', () => {
    const refreshSchool = jest.fn().mockResolvedValue(undefined);

    mockedUseSchoolResource.mockReturnValue(
      createSchoolResourceState({
        errorMessage: 'Falha ao carregar turmas.',
        hasSchoolLoadError: true,
        refreshSchool,
        school: undefined,
      }),
    );

    renderWithUi(<ClassroomsScreen />);

    expect(screen.getByText('Falha ao carregar')).toBeTruthy();
    expect(screen.getByText('Falha ao carregar turmas.')).toBeTruthy();

    fireEvent.press(screen.getByText('Tentar novamente'));

    expect(refreshSchool).toHaveBeenCalledTimes(1);
  });
});
