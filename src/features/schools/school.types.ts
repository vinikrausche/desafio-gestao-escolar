import type { Classroom, ClassroomInput } from '../classrooms/classroom.types';

export type SchoolSummary = {
  address: string;
  classrooms: Classroom[];
  id: string;
  name: string;
};

export type CreateSchoolInput = {
  address: string;
  classrooms: {
    name: string;
  }[];
  name: string;
};

export type UpdateSchoolInput = {
  address: string;
  classrooms: ClassroomInput[];
  name: string;
};
