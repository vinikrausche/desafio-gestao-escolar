import type { MockDatabaseState } from '../../../types/server/mirage/mock-db.types';

export type {
  ClassroomRecord,
  MockDatabaseState,
  SchoolEntity,
  SchoolPhotoRecord,
} from '../../../types/server/mirage/mock-db.types';

export const initialMockDb: MockDatabaseState = {
  schools: [
    {
      address: 'Rua das Acacias, 120 - Centro',
      addressNumber: '120',
      city: 'Manaus',
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
      district: 'Centro',
      id: 'school-seed-1',
      name: 'Escola Municipal Centro',
      photos: [],
      postalCode: '69005-000',
      state: 'AM',
    },
    {
      address: 'Avenida do Campo, 55 - Vila Nova',
      addressNumber: '55',
      city: 'Manaus',
      classrooms: [
        {
          id: 'classroom-seed-3',
          name: '7º Ano A',
          schoolYear: '2026',
          shift: 'morning',
        },
      ],
      district: 'Vila Nova',
      id: 'school-seed-2',
      name: 'Escola Municipal Vila Nova',
      photos: [],
      postalCode: '69000-000',
      state: 'AM',
    },
  ],
};
