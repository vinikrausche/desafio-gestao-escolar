import type {
  CreateClassroomInput,
  UpdateClassroomInput,
} from '../features/classrooms/classroom.types';
import type {
  CreateSchoolInput,
  SchoolSummary,
  UpdateSchoolInput,
} from '../features/schools/school.types';

export type ResourceStatus = 'idle' | 'loading' | 'ready' | 'error';

export type LoadOptions = {
  force?: boolean;
};

export type SchoolCacheSnapshot = {
  schoolIds: string[];
  schoolsById: Record<string, SchoolSummary>;
};

export type SchoolsStoreState = {
  errorMessage: string | null;
  hasLoadedOnce: boolean;
  schoolIds: string[];
  schoolsById: Record<string, SchoolSummary>;
  status: ResourceStatus;
  createSchool: (payload: CreateSchoolInput) => Promise<SchoolSummary>;
  createClassroom: (
    schoolId: string,
    payload: CreateClassroomInput,
  ) => Promise<SchoolSummary>;
  deleteClassroom: (
    schoolId: string,
    classroomId: string,
  ) => Promise<SchoolSummary>;
  deleteSchool: (schoolId: string) => Promise<void>;
  loadSchools: (options?: LoadOptions) => Promise<SchoolSummary[]>;
  updateClassroom: (
    schoolId: string,
    classroomId: string,
    payload: UpdateClassroomInput,
  ) => Promise<SchoolSummary>;
  updateSchool: (
    schoolId: string,
    payload: UpdateSchoolInput,
  ) => Promise<SchoolSummary>;
};
