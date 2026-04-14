import type { ClassroomRecord } from './mock-db.types';

export type ClassResource = ClassroomRecord & {
  schoolId: string;
  schoolName: string;
};
