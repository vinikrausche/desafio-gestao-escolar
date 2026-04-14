import { classroomModel } from './mock-school.model';
import { clearPersistedMockDb, resetMockDb } from '../seeds/in-memory-db';

describe('ClassroomModel', () => {
  beforeEach(async () => {
    resetMockDb();
    await clearPersistedMockDb();
  });

  it('cria, atualiza e remove uma turma da escola', async () => {
    const schoolAfterCreate = await classroomModel.createClassroom(
      'school-seed-1',
      {
        name: '8º Ano C',
        schoolYear: '2026',
        shift: 'night',
      },
    );

    const createdClassroom = schoolAfterCreate?.classrooms.find(
      (classroom) => classroom.name === '8º Ano C',
    );

    expect(createdClassroom).toEqual(
      expect.objectContaining({
        name: '8º Ano C',
        schoolYear: '2026',
        shift: 'night',
      }),
    );

    const schoolAfterUpdate = await classroomModel.updateClassroom(
      'school-seed-1',
      createdClassroom?.id ?? '',
      {
        name: '8º Ano C - Atualizada',
        schoolYear: '2027',
        shift: 'afternoon',
      },
    );

    expect(schoolAfterUpdate?.classrooms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: createdClassroom?.id,
          name: '8º Ano C - Atualizada',
          schoolYear: '2027',
          shift: 'afternoon',
        }),
      ]),
    );

    const schoolAfterDelete = await classroomModel.deleteClassroom(
      'school-seed-1',
      createdClassroom?.id ?? '',
    );

    expect(
      schoolAfterDelete?.classrooms.find(
        (classroom) => classroom.id === createdClassroom?.id,
      ),
    ).toBeUndefined();
  });

  it('lista turmas no formato plano para o endpoint /classes', () => {
    expect(classroomModel.listClasses()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'classroom-seed-1',
          name: '6º Ano A',
          schoolId: 'school-seed-1',
          schoolName: 'Escola Municipal Centro',
        }),
        expect.objectContaining({
          id: 'classroom-seed-3',
          name: '7º Ano A',
          schoolId: 'school-seed-2',
          schoolName: 'Escola Municipal Vila Nova',
        }),
      ]),
    );

    expect(classroomModel.listClasses('school-seed-1')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          schoolId: 'school-seed-1',
        }),
      ]),
    );
  });

  it('cria, consulta, atualiza e remove uma turma pelo recurso /classes', async () => {
    const createdClass = await classroomModel.createClass({
      name: '9º Ano C',
      schoolId: 'school-seed-2',
      schoolYear: '2027',
      shift: 'night',
    });

    expect(createdClass).toEqual(
      expect.objectContaining({
        name: '9º Ano C',
        schoolId: 'school-seed-2',
        schoolName: 'Escola Municipal Vila Nova',
        schoolYear: '2027',
        shift: 'night',
      }),
    );

    expect(classroomModel.getClass(createdClass?.id ?? '')).toEqual(
      expect.objectContaining({
        id: createdClass?.id,
        schoolId: 'school-seed-2',
      }),
    );

    expect(
      await classroomModel.updateClass(createdClass?.id ?? '', {
        name: '9º Ano C - Atualizada',
        schoolYear: '2028',
        shift: 'afternoon',
      }),
    ).toEqual(
      expect.objectContaining({
        id: createdClass?.id,
        name: '9º Ano C - Atualizada',
        schoolYear: '2028',
        shift: 'afternoon',
      }),
    );

    expect(await classroomModel.deleteClass(createdClass?.id ?? '')).toBe(true);
    expect(classroomModel.getClass(createdClass?.id ?? '')).toBeUndefined();
  });
});
