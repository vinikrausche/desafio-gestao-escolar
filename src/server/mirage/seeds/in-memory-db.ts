import { mockDbStorage } from './mock-db.storage';
import {
  initialMockDb,
  type ClassroomRecord,
  type MockDatabaseState,
  type SchoolEntity,
} from './mock-db.types';

let mockDb = clone(initialMockDb);
let persistQueue = Promise.resolve();

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

async function persistMockDbSnapshot(snapshot: MockDatabaseState) {
  try {
    await mockDbStorage.write(snapshot);
  } catch {
    // A persistencia offline e opcional. Se o storage falhar, o app segue com o banco em memoria.
  }
}

async function waitForPersistQueue() {
  await persistQueue.catch(() => undefined);
}

export async function hydrateMockDb() {
  await waitForPersistQueue();

  try {
    const persistedState = await mockDbStorage.read();
    mockDb = clone(persistedState ?? initialMockDb);
  } catch {
    mockDb = clone(initialMockDb);
  }

  return readMockDb();
}

export function readMockDb(): MockDatabaseState {
  return clone(mockDb);
}

export function resetMockDb() {
  mockDb = clone(initialMockDb);
}

export function writeMockDb(nextState: MockDatabaseState) {
  const snapshot = clone(nextState);

  mockDb = snapshot;
  persistQueue = persistQueue
    .catch(() => undefined)
    .then(() => persistMockDbSnapshot(snapshot));

  return persistQueue;
}

export async function clearPersistedMockDb() {
  await waitForPersistQueue();
  resetMockDb();
  persistQueue = Promise.resolve();

  try {
    await mockDbStorage.clear();
  } catch {
    // Mantem o reset em memoria mesmo quando a limpeza persistida nao estiver disponivel.
  }
}

export type { ClassroomRecord, MockDatabaseState, SchoolEntity };
