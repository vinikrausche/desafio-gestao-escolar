import { z } from 'zod';

import { classroomPayloadSchema } from './classroom.dto';

export const createSchoolDtoSchema = z
  .object({
    address: z.string().trim().min(1, 'O endereço da escola é obrigatório.'),
    classrooms: z.array(classroomPayloadSchema).optional().default([]),
    name: z.string().trim().min(1, 'O nome da escola é obrigatório.'),
  })
  .strict();

export const updateSchoolDtoSchema = z
  .object({
    address: z.string().trim().min(1, 'O endereço da escola é obrigatório.'),
    classrooms: z.array(classroomPayloadSchema).optional(),
    name: z.string().trim().min(1, 'O nome da escola é obrigatório.'),
  })
  .strict();

export type CreateSchoolPayload = z.infer<typeof createSchoolDtoSchema>;
export type UpdateSchoolPayload = z.infer<typeof updateSchoolDtoSchema>;
