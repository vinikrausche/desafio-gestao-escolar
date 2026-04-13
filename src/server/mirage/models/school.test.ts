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
        },
        {
          name: '9º Ano B',
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
            }),
            expect.objectContaining({
              name: '9º Ano B',
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
          },
          {
            name: '7º Ano A',
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
          }),
          expect.objectContaining({
            name: '7º Ano A',
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
});
