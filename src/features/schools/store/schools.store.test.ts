import { classroomsService } from '../../classrooms/services/classrooms.service';
import { schoolsService } from '../services/schools.service';
import type { SchoolSummary } from '../school.types';
import { useSchoolsStore } from './schools.store';

jest.mock('../../classrooms/services/classrooms.service', () => ({
  classroomsService: {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('../services/schools.service', () => ({
  schoolsService: {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn(),
  },
}));

const mockedClassroomsService = jest.mocked(classroomsService);
const mockedSchoolsService = jest.mocked(schoolsService);
const initialSchoolState = useSchoolsStore.getState();

function resetSchoolsStore() {
  useSchoolsStore.setState(initialSchoolState, true);
}

describe('useSchoolsStore', () => {
  beforeEach(() => {
    resetSchoolsStore();
    jest.clearAllMocks();
  });

  it('reutiliza o cache de escolas depois da primeira carga', async () => {
    const apiSchools: SchoolSummary[] = [
      {
        address: 'Avenida Central, 100',
        classrooms: [
          {
            id: 'classroom-1',
            name: '6º Ano A',
            schoolYear: '2026',
            shift: 'morning',
          },
        ],
        id: 'school-1',
        name: 'Escola Centro',
      },
    ];

    mockedSchoolsService.list.mockResolvedValue(apiSchools);

    const firstResult = await useSchoolsStore.getState().loadSchools();
    const secondResult = await useSchoolsStore.getState().loadSchools();

    expect(firstResult).toEqual(apiSchools);
    expect(secondResult).toEqual(apiSchools);
    expect(mockedSchoolsService.list).toHaveBeenCalledTimes(1);
  });

  it('insere a nova escola no cache local apos criar', async () => {
    const createdSchool: SchoolSummary = {
      address: 'Rua Nova, 45',
      classrooms: [],
      id: 'school-10',
      name: 'Escola Nova',
    };

    mockedSchoolsService.create.mockResolvedValue(createdSchool);

    await useSchoolsStore.getState().createSchool({
      address: 'Rua Nova, 45',
      classrooms: [],
      name: 'Escola Nova',
    });

    expect(useSchoolsStore.getState().schoolsById['school-10']).toEqual(
      createdSchool,
    );
    expect(useSchoolsStore.getState().schoolIds).toEqual(['school-10']);
  });

  it('remove a escola do cache local apos excluir', async () => {
    useSchoolsStore.setState((state) => ({
      ...state,
      hasLoadedOnce: true,
      schoolIds: ['school-1'],
      schoolsById: {
        'school-1': {
          address: 'Rua A, 10',
          classrooms: [],
          id: 'school-1',
          name: 'Escola A',
        },
      },
      status: 'ready',
    }));

    mockedSchoolsService.delete.mockResolvedValue(undefined);

    await useSchoolsStore.getState().deleteSchool('school-1');

    expect(useSchoolsStore.getState().schoolIds).toEqual([]);
    expect(useSchoolsStore.getState().schoolsById).toEqual({});
  });

  it('forca uma nova carga quando recebe a opcao force', async () => {
    const firstSchools: SchoolSummary[] = [
      {
        address: 'Rua A, 10',
        classrooms: [],
        id: 'school-1',
        name: 'Escola A',
      },
    ];
    const refreshedSchools: SchoolSummary[] = [
      {
        address: 'Rua B, 20',
        classrooms: [],
        id: 'school-2',
        name: 'Escola B',
      },
    ];

    mockedSchoolsService.list
      .mockResolvedValueOnce(firstSchools)
      .mockResolvedValueOnce(refreshedSchools);

    await useSchoolsStore.getState().loadSchools();
    const nextResult = await useSchoolsStore.getState().loadSchools({
      force: true,
    });

    expect(nextResult).toEqual(refreshedSchools);
    expect(mockedSchoolsService.list).toHaveBeenCalledTimes(2);
    expect(useSchoolsStore.getState().schoolIds).toEqual(['school-2']);
  });

  it('salva status e mensagem quando a carga falha', async () => {
    const error = new Error('Falha ao buscar escolas');

    mockedSchoolsService.list.mockRejectedValue(error);

    await expect(useSchoolsStore.getState().loadSchools()).rejects.toThrow(
      'Falha ao buscar escolas',
    );

    expect(useSchoolsStore.getState().status).toBe('error');
    expect(useSchoolsStore.getState().errorMessage).toBe(
      'Falha ao buscar escolas',
    );
  });

  it('atualiza a escola no cache local apos editar', async () => {
    useSchoolsStore.setState((state) => ({
      ...state,
      hasLoadedOnce: true,
      schoolIds: ['school-1'],
      schoolsById: {
        'school-1': {
          address: 'Rua Antiga, 12',
          classrooms: [],
          id: 'school-1',
          name: 'Escola Antiga',
        },
      },
      status: 'ready',
    }));

    const updatedSchool: SchoolSummary = {
      address: 'Avenida Nova, 200',
      classrooms: [
        {
          id: 'classroom-1',
          name: '8º Ano A',
          schoolYear: '2027',
          shift: 'afternoon',
        },
      ],
      id: 'school-1',
      name: 'Escola Atualizada',
    };

    mockedSchoolsService.update.mockResolvedValue(updatedSchool);

    await useSchoolsStore.getState().updateSchool('school-1', {
      address: 'Avenida Nova, 200',
      classrooms: [
        {
          id: 'classroom-1',
          name: '8º Ano A',
          schoolYear: '2027',
          shift: 'afternoon',
        },
      ],
      name: 'Escola Atualizada',
    });

    expect(useSchoolsStore.getState().schoolsById['school-1']).toEqual(
      updatedSchool,
    );
    expect(useSchoolsStore.getState().schoolIds).toEqual(['school-1']);
  });

  it('atualiza o cache local apos cadastrar uma turma', async () => {
    useSchoolsStore.setState((state) => ({
      ...state,
      hasLoadedOnce: true,
      schoolIds: ['school-1'],
      schoolsById: {
        'school-1': {
          address: 'Rua A, 10',
          classrooms: [],
          id: 'school-1',
          name: 'Escola A',
        },
      },
      status: 'ready',
    }));

    const updatedSchool: SchoolSummary = {
      address: 'Rua A, 10',
      classrooms: [
        {
          id: 'classroom-1',
          name: '6º Ano A',
          schoolYear: '2026',
          shift: 'morning',
        },
      ],
      id: 'school-1',
      name: 'Escola A',
    };

    mockedClassroomsService.create.mockResolvedValue(updatedSchool);

    await useSchoolsStore.getState().createClassroom('school-1', {
      name: '6º Ano A',
      schoolYear: '2026',
      shift: 'morning',
    });

    expect(useSchoolsStore.getState().schoolsById['school-1']).toEqual(
      updatedSchool,
    );
  });

  it('atualiza o cache local apos editar uma turma', async () => {
    const updatedSchool: SchoolSummary = {
      address: 'Rua A, 10',
      classrooms: [
        {
          id: 'classroom-1',
          name: '6º Ano A - Atualizada',
          schoolYear: '2027',
          shift: 'afternoon',
        },
      ],
      id: 'school-1',
      name: 'Escola A',
    };

    mockedClassroomsService.update.mockResolvedValue(updatedSchool);

    await useSchoolsStore
      .getState()
      .updateClassroom('school-1', 'classroom-1', {
        name: '6º Ano A - Atualizada',
        schoolYear: '2027',
        shift: 'afternoon',
      });

    expect(useSchoolsStore.getState().schoolsById['school-1']).toEqual(
      updatedSchool,
    );
  });

  it('atualiza o cache local apos excluir uma turma', async () => {
    useSchoolsStore.setState((state) => ({
      ...state,
      hasLoadedOnce: true,
      schoolIds: ['school-1'],
      schoolsById: {
        'school-1': {
          address: 'Rua A, 10',
          classrooms: [
            {
              id: 'classroom-1',
              name: '6º Ano A',
              schoolYear: '2026',
              shift: 'morning',
            },
          ],
          id: 'school-1',
          name: 'Escola A',
        },
      },
      status: 'ready',
    }));

    const updatedSchool: SchoolSummary = {
      address: 'Rua A, 10',
      classrooms: [],
      id: 'school-1',
      name: 'Escola A',
    };

    mockedClassroomsService.delete.mockResolvedValue(updatedSchool);

    await useSchoolsStore.getState().deleteClassroom('school-1', 'classroom-1');

    expect(useSchoolsStore.getState().schoolsById['school-1']).toEqual(
      updatedSchool,
    );
  });
});
