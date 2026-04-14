import type { ClassroomShift } from './classroom.types';

export type ClassroomFormField = keyof ClassroomFormValues;

export type ClassroomFormValues = {
  name: string;
  schoolYear: string;
  shift: ClassroomShift;
};

export type ClassroomFormErrors = {
  form?: string;
  name?: string;
  schoolYear?: string;
  shift?: string;
};
