import { requestJson } from '../../../lib/api/client';
import type { SchoolSummary } from '../../schools/school.types';
import type {
  Classroom,
  CreateClassroomInput,
  UpdateClassroomInput,
} from '../classroom.types';

export const classroomsService = {
  create(schoolId: string, payload: CreateClassroomInput) {
    return requestJson<SchoolSummary>(`/schools/${schoolId}/classrooms`, {
      body: payload,
      method: 'POST',
    });
  },
  delete(schoolId: string, classroomId: string) {
    return requestJson<SchoolSummary>(
      `/schools/${schoolId}/classrooms/${classroomId}`,
      {
        method: 'DELETE',
      },
    );
  },
  list(schoolId: string) {
    return requestJson<Classroom[]>(`/schools/${schoolId}/classrooms`);
  },
  update(schoolId: string, classroomId: string, payload: UpdateClassroomInput) {
    return requestJson<SchoolSummary>(
      `/schools/${schoolId}/classrooms/${classroomId}`,
      {
        body: payload,
        method: 'PUT',
      },
    );
  },
};
