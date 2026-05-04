import type {
  Classroom,
  ClassroomInput,
  CreateClassroomInput,
} from '../classrooms/classroom.types';

export type SchoolPhoto = {
  id: string;
  uri: string;
};

export type SchoolPhotoInput = {
  id?: string;
  uri: string;
};

export type SchoolSummary = {
  address: string;
  addressNumber?: string;
  city?: string;
  classrooms: Classroom[];
  district?: string;
  id: string;
  name: string;
  photos?: SchoolPhoto[];
  postalCode?: string;
  state?: string;
};

export type CreateSchoolInput = {
  address: string;
  addressNumber?: string;
  city: string;
  classrooms?: CreateClassroomInput[];
  district: string;
  name: string;
  photos?: SchoolPhotoInput[];
  postalCode: string;
  state: string;
};

export type UpdateSchoolInput = {
  address: string;
  addressNumber?: string;
  city: string;
  classrooms?: ClassroomInput[];
  district: string;
  name: string;
  photos?: SchoolPhotoInput[];
  postalCode: string;
  state: string;
};
