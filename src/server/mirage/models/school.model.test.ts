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
      addressNumber: '100',
      city: 'Manaus',
      classrooms: [
        {
          name: '8º Ano A',
          schoolYear: '2026',
          shift: 'morning',
        },
      ],
      district: 'Centro',
      name: 'Escola Centro',
      photos: [{ uri: 'file://foto-centro.jpg' }],
      postalCode: '69005-000',
      state: 'AM',
    });

    expect(school.id).toMatch(/^school-/);
    expect(school.classrooms).toHaveLength(1);
    expect(school.classrooms[0]?.id).toMatch(/^classroom-/);
    expect(school.photos[0]?.id).toMatch(/^school-photo-/);
    expect(readMockDb().schools).toHaveLength(3);
  });

  it('lista as escolas com as turmas persistidas', async () => {
    const school = await schoolModel.create({
      address: 'Rua Um, 10',
      addressNumber: '10',
      city: 'Manaus',
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
      district: 'Centro',
      name: 'Escola A',
      photos: [],
      postalCode: '69005-000',
      state: 'AM',
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
      addressNumber: '1',
      city: 'Manaus',
      classrooms: [
        {
          name: '6º Ano A',
          schoolYear: '2026',
          shift: 'morning',
        },
      ],
      district: 'Centro',
      name: 'Escola Norte',
      photos: [],
      postalCode: '69005-000',
      state: 'AM',
    });

    const classroomId = school.classrooms[0]?.id;

    expect(
      await schoolModel.update(school.id, {
        address: 'Rua Nova, 200',
        addressNumber: '200',
        city: 'Manaus',
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
        district: 'Aleixo',
        name: 'Escola Norte Atualizada',
        photos: [{ uri: 'file://foto-norte.jpg' }],
        postalCode: '69050-000',
        state: 'AM',
      }),
    ).toEqual(
      expect.objectContaining({
        address: 'Rua Nova, 200',
        addressNumber: '200',
        city: 'Manaus',
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
        district: 'Aleixo',
        name: 'Escola Norte Atualizada',
        photos: [
          expect.objectContaining({
            uri: 'file://foto-norte.jpg',
          }),
        ],
        postalCode: '69050-000',
        state: 'AM',
      }),
    );
  });

  it('remove a escola do banco em memoria', async () => {
    const school = await schoolModel.create({
      address: 'Avenida Sul, 7',
      addressNumber: '7',
      city: 'Manaus',
      classrooms: [],
      district: 'Centro',
      name: 'Escola Sul',
      photos: [],
      postalCode: '69005-000',
      state: 'AM',
    });

    expect(await schoolModel.delete(school.id)).toBe(true);
    expect(
      readMockDb().schools.find((item) => item.id === school.id),
    ).toBeUndefined();
  });

  it('persiste a edicao de uma escola seed antes de concluir o update', async () => {
    await schoolModel.update('school-seed-1', {
      address: 'Rua das Acacias, 120 - Centro',
      addressNumber: '120',
      city: 'Manaus',
      district: 'Centro',
      name: 'Escola Municipal Centro Atualizada',
      photos: [],
      postalCode: '69005-000',
      state: 'AM',
    });

    const persistedState = await AsyncStorage.getItem(MOCK_DB_STORAGE_KEY);

    expect(persistedState).toContain('Escola Municipal Centro Atualizada');
  });
});
