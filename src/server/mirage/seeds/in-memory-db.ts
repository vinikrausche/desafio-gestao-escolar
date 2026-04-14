export type ClassroomRecord = {
  id: string;
  name: string;
  schoolYear: string;
  shift: 'morning' | 'afternoon' | 'night';
};

export type SchoolEntity = {
  address: string;
  classrooms: ClassroomRecord[];
  id: string;
  name: string;
};

export type MockDatabaseState = {
  schools: SchoolEntity[];
};

const initialMockDb: MockDatabaseState = {
  schools: [
    {
      address: 'Rua das Acacias, 120 - Centro',
      classrooms: [
        {
          id: 'classroom-seed-1',
          name: '6º Ano A',
          schoolYear: '2026',
          shift: 'morning',
        },
        {
          id: 'classroom-seed-2',
          name: '6º Ano B',
          schoolYear: '2026',
          shift: 'afternoon',
        },
      ],
      id: 'school-seed-1',
      name: 'Escola Municipal Centro',
    },
    {
      address: 'Avenida do Campo, 55 - Vila Nova',
      classrooms: [
        {
          id: 'classroom-seed-3',
          name: '7º Ano A',
          schoolYear: '2026',
          shift: 'morning',
        },
      ],
      id: 'school-seed-2',
      name: 'Escola Municipal Vila Nova',
    },
  ],
};

let mockDb = clone(initialMockDb);

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function readMockDb(): MockDatabaseState {
  return clone(mockDb);
}

export function resetMockDb() {
  mockDb = clone(initialMockDb);
}

export function writeMockDb(nextState: MockDatabaseState) {
  mockDb = clone(nextState);
}
