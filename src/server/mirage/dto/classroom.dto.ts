import { z } from 'zod';

export const classroomShiftSchema = z.enum(['morning', 'afternoon', 'night']);

export const createClassroomDtoSchema = z
  .object({
    name: z.string().trim().min(1, 'O nome da turma é obrigatório.'),
    schoolYear: z
      .string()
      .trim()
      .regex(/^\d{4}$/, 'O ano letivo deve ter 4 dígitos.'),
    shift: classroomShiftSchema,
  })
  .strict();

export const updateClassroomDtoSchema = createClassroomDtoSchema;

export const classroomPayloadSchema = createClassroomDtoSchema
  .extend({
    id: z.string().trim().min(1).optional(),
  })
  .strict();

export type CreateClassroomPayload = z.infer<typeof createClassroomDtoSchema>;
export type UpdateClassroomPayload = z.infer<typeof updateClassroomDtoSchema>;
