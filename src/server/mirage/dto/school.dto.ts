import { z } from 'zod';

import { classroomPayloadSchema } from './classroom.dto';

const postalCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido.');

const schoolPhotoPayloadSchema = z
  .object({
    id: z.string().optional(),
    uri: z.string().trim().min(1, 'A foto da escola é obrigatória.'),
  })
  .strict();

export const createSchoolDtoSchema = z
  .object({
    address: z.string().trim().min(1, 'O endereço da escola é obrigatório.'),
    addressNumber: z.string().trim().optional().default(''),
    city: z.string().trim().min(1, 'A cidade da escola é obrigatória.'),
    classrooms: z.array(classroomPayloadSchema).optional().default([]),
    district: z.string().trim().min(1, 'O bairro da escola é obrigatório.'),
    name: z.string().trim().min(1, 'O nome da escola é obrigatório.'),
    photos: z.array(schoolPhotoPayloadSchema).optional().default([]),
    postalCode: postalCodeSchema,
    state: z.string().trim().length(2, 'A UF da escola deve ter 2 caracteres.'),
  })
  .strict();

export const updateSchoolDtoSchema = z
  .object({
    address: z.string().trim().min(1, 'O endereço da escola é obrigatório.'),
    addressNumber: z.string().trim().optional().default(''),
    city: z.string().trim().min(1, 'A cidade da escola é obrigatória.'),
    classrooms: z.array(classroomPayloadSchema).optional(),
    district: z.string().trim().min(1, 'O bairro da escola é obrigatório.'),
    name: z.string().trim().min(1, 'O nome da escola é obrigatório.'),
    photos: z.array(schoolPhotoPayloadSchema).optional(),
    postalCode: postalCodeSchema,
    state: z.string().trim().length(2, 'A UF da escola deve ter 2 caracteres.'),
  })
  .strict();

export type CreateSchoolPayload = z.infer<typeof createSchoolDtoSchema>;
export type UpdateSchoolPayload = z.infer<typeof updateSchoolDtoSchema>;
