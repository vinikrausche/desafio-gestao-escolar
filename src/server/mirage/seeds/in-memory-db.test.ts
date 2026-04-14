import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  clearPersistedMockDb,
  hydrateMockDb,
  readMockDb,
  writeMockDb,
} from './in-memory-db';
import { MOCK_DB_STORAGE_KEY } from './mock-db.storage';
import { initialMockDb, type MockDatabaseState } from './mock-db.types';

describe('in-memory-db', () => {
  beforeEach(async () => {
    await clearPersistedMockDb();
  });

  it('hidrata o banco a partir do estado persistido quando disponivel', async () => {
    const persistedState: MockDatabaseState = {
      schools: [
        {
          address: 'Rua Persistida, 50',
          classrooms: [],
          id: 'school-persisted-1',
          name: 'Escola Persistida',
        },
      ],
    };

    await AsyncStorage.setItem(
      MOCK_DB_STORAGE_KEY,
      JSON.stringify(persistedState),
    );

    await hydrateMockDb();

    expect(readMockDb()).toEqual(persistedState);
  });

  it('descarta payload invalido e volta para o seed inicial', async () => {
    await AsyncStorage.setItem(MOCK_DB_STORAGE_KEY, '{"schools":"invalid"}');

    await hydrateMockDb();

    expect(readMockDb()).toEqual(initialMockDb);
    expect(await AsyncStorage.getItem(MOCK_DB_STORAGE_KEY)).toBeNull();
  });

  it('persiste alteracoes do banco local no AsyncStorage', async () => {
    const nextState: MockDatabaseState = {
      schools: [
        ...initialMockDb.schools,
        {
          address: 'Avenida Nova, 120',
          classrooms: [],
          id: 'school-offline-1',
          name: 'Escola Offline',
        },
      ],
    };

    await writeMockDb(nextState);

    expect(readMockDb()).toEqual(nextState);
    expect(await AsyncStorage.getItem(MOCK_DB_STORAGE_KEY)).toBe(
      JSON.stringify(nextState),
    );
  });
});
