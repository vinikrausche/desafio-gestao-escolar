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
  addressNumber: z.string().optional().default(''),
  city: z.string().optional().default(''),
  classrooms: z.array(classroomRecordSchema),
  district: z.string().optional().default(''),
  id: z.string(),
  name: z.string(),
  photos: z
    .array(
      z.object({
        id: z.string(),
        uri: z.string(),
      }),
    )
    .optional()
    .default([]),
  postalCode: z.string().optional().default(''),
  state: z.string().optional().default(''),
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
