import { schoolModel } from './school';
import { readMockDb, resetMockDb } from '../seeds/in-memory-db';

describe('schoolModel', () => {
  beforeEach(() => {
    resetMockDb();
  });

  it('cria a escola com turmas associadas', () => {
    const school = schoolModel.create({
      address: 'Avenida Brasil, 100',
      classrooms: [
        {
          name: '8º Ano A',
          schoolYear: '2026',
          shift: 'morning',
        },
      ],
      name: 'Escola Centro',
    });

    expect(school.id).toMatch(/^school-/);
    expect(school.classrooms).toHaveLength(1);
    expect(school.classrooms[0]?.id).toMatch(/^classroom-/);
    expect(readMockDb().schools).toHaveLength(3);
  });

  it('lista as escolas com as turmas persistidas', () => {
    const school = schoolModel.create({
      address: 'Rua Um, 10',
      classrooms: [
        {
          name: '9º Ano A',
          schoolYear: '2026',
          shift: 'morning',
        },
        {
          name: '9º Ano B',
          schoolYear: '2026',
          shift: 'afternoon',
        },
      ],
      name: 'Escola A',
    });

    expect(schoolModel.list()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          classrooms: expect.arrayContaining([
            expect.objectContaining({
              name: '9º Ano A',
              schoolYear: '2026',
              shift: 'morning',
            }),
            expect.objectContaining({
              name: '9º Ano B',
              schoolYear: '2026',
              shift: 'afternoon',
            }),
          ]),
          id: school.id,
        }),
      ]),
    );
  });

  it('atualiza a escola e preserva ids existentes das turmas quando enviados', () => {
    const school = schoolModel.create({
      address: 'Rua Antiga, 1',
      classrooms: [
        {
          name: '6º Ano A',
          schoolYear: '2026',
          shift: 'morning',
        },
      ],
      name: 'Escola Norte',
    });

    const classroomId = school.classrooms[0]?.id;

    expect(
      schoolModel.update(school.id, {
        address: 'Rua Nova, 200',
        classrooms: [
          {
            id: classroomId,
            name: '6º Ano A - Atualizada',
            schoolYear: '2027',
            shift: 'afternoon',
          },
          {
            name: '7º Ano A',
            schoolYear: '2027',
            shift: 'night',
          },
        ],
        name: 'Escola Norte Atualizada',
      }),
    ).toEqual(
      expect.objectContaining({
        address: 'Rua Nova, 200',
        classrooms: expect.arrayContaining([
          expect.objectContaining({
            id: classroomId,
            name: '6º Ano A - Atualizada',
            schoolYear: '2027',
            shift: 'afternoon',
          }),
          expect.objectContaining({
            name: '7º Ano A',
            schoolYear: '2027',
            shift: 'night',
          }),
        ]),
        name: 'Escola Norte Atualizada',
      }),
    );
  });

  it('remove a escola do banco em memoria', () => {
    const school = schoolModel.create({
      address: 'Avenida Sul, 7',
      classrooms: [],
      name: 'Escola Sul',
    });

    expect(schoolModel.delete(school.id)).toBe(true);
    expect(
      readMockDb().schools.find((item) => item.id === school.id),
    ).toBeUndefined();
  });

  it('cria, atualiza e remove uma turma da escola', () => {
    const schoolAfterCreate = schoolModel.createClassroom('school-seed-1', {
      name: '8º Ano C',
      schoolYear: '2026',
      shift: 'night',
    });

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

    const schoolAfterUpdate = schoolModel.updateClassroom(
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

    const schoolAfterDelete = schoolModel.deleteClassroom(
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
    expect(schoolModel.listClasses()).toEqual(
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

    expect(schoolModel.listClasses('school-seed-1')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          schoolId: 'school-seed-1',
        }),
      ]),
    );
  });

  it('cria, consulta, atualiza e remove uma turma pelo recurso /classes', () => {
    const createdClass = schoolModel.createClass({
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

    expect(schoolModel.getClass(createdClass?.id ?? '')).toEqual(
      expect.objectContaining({
        id: createdClass?.id,
        schoolId: 'school-seed-2',
      }),
    );

    expect(
      schoolModel.updateClass(createdClass?.id ?? '', {
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

    expect(schoolModel.deleteClass(createdClass?.id ?? '')).toBe(true);
    expect(schoolModel.getClass(createdClass?.id ?? '')).toBeUndefined();
  });
});
