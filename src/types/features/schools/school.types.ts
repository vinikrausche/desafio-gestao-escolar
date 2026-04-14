import type {
  Classroom,
  ClassroomInput,
  CreateClassroomInput,
} from '../classrooms/classroom.types';

export type SchoolSummary = {
  address: string;
  classrooms: Classroom[];
  id: string;
  name: string;
};

export type CreateSchoolInput = {
  address: string;
  classrooms?: CreateClassroomInput[];
  name: string;
};

export type UpdateSchoolInput = {
  address: string;
  classrooms?: ClassroomInput[];
  name: string;
};
