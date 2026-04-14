import { z } from 'zod';

import { asyncStorageClient } from '../../../lib/storage/async-storage.client';
import { createJsonStorageRepository } from '../../../lib/storage/json-storage.repository';
import type { MockDatabaseState } from './mock-db.types';

const classroomRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  schoolYear: z.string(),
  shift: z.enum(['morning', 'afternoon', 'night']),
});

const schoolEntitySchema = z.object({
  address: z.string(),
  classrooms: z.array(classroomRecordSchema),
  id: z.string(),
  name: z.string(),
});

const mockDatabaseStateSchema = z.object({
  schools: z.array(schoolEntitySchema),
});

export const MOCK_DB_STORAGE_KEY = '@gestao-escolar/mock-db';

export const mockDbStorage = createJsonStorageRepository<MockDatabaseState>({
  key: MOCK_DB_STORAGE_KEY,
  schema: mockDatabaseStateSchema,
  storage: asyncStorageClient,
});
