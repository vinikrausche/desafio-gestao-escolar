import AsyncStorage from '@react-native-async-storage/async-storage';

import { schoolModel } from './mock-school.model';
import {
  clearPersistedMockDb,
  readMockDb,
  resetMockDb,
} from '../seeds/in-memory-db';
import { MOCK_DB_STORAGE_KEY } from '../seeds/mock-db.storage';

describe('SchoolModel', () => {
  beforeEach(async () => {
    resetMockDb();
    await clearPersistedMockDb();
  });

  it('cria a escola com turmas associadas', async () => {
    const school = await schoolModel.create({
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

  it('lista as escolas com as turmas persistidas', async () => {
    const school = await schoolModel.create({
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

  it('atualiza a escola e preserva ids existentes das turmas quando enviados', async () => {
    const school = await schoolModel.create({
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
      await schoolModel.update(school.id, {
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

  it('remove a escola do banco em memoria', async () => {
    const school = await schoolModel.create({
      address: 'Avenida Sul, 7',
      classrooms: [],
      name: 'Escola Sul',
    });

    expect(await schoolModel.delete(school.id)).toBe(true);
    expect(
      readMockDb().schools.find((item) => item.id === school.id),
    ).toBeUndefined();
  });

  it('persiste a edicao de uma escola seed antes de concluir o update', async () => {
    await schoolModel.update('school-seed-1', {
      address: 'Rua das Acacias, 120 - Centro',
      name: 'Escola Municipal Centro Atualizada',
    });

    const persistedState = await AsyncStorage.getItem(MOCK_DB_STORAGE_KEY);

    expect(persistedState).toContain('Escola Municipal Centro Atualizada');
  });
});
