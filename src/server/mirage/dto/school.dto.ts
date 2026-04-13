import { z } from 'zod';

const classroomPayloadSchema = z
  .object({
    id: z.string().trim().min(1).optional(),
    name: z.string().trim().min(1, 'O nome da turma é obrigatório.'),
  })
  .strict();

export const createSchoolDtoSchema = z
  .object({
    address: z.string().trim().min(1, 'O endereço da escola é obrigatório.'),
    classrooms: z.array(classroomPayloadSchema),
    name: z.string().trim().min(1, 'O nome da escola é obrigatório.'),
  })
  .strict();

export const updateSchoolDtoSchema = createSchoolDtoSchema;

export type CreateSchoolPayload = z.infer<typeof createSchoolDtoSchema>;
export type UpdateSchoolPayload = z.infer<typeof updateSchoolDtoSchema>;
