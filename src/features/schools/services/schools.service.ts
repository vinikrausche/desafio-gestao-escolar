import { requestJson } from '../../../lib/api/client';
import type {
  CreateSchoolInput,
  SchoolSummary,
  UpdateSchoolInput,
} from '../school.types';

export const schoolsService = {
  create(payload: CreateSchoolInput) {
    return requestJson<SchoolSummary>('/schools', {
      body: payload,
      method: 'POST',
    });
  },
  delete(schoolId: string) {
    return requestJson<void>(`/schools/${schoolId}`, {
      method: 'DELETE',
    });
  },
  list() {
    return requestJson<SchoolSummary[]>('/schools');
  },
  update(schoolId: string, payload: UpdateSchoolInput) {
    return requestJson<SchoolSummary>(`/schools/${schoolId}`, {
      body: payload,
      method: 'PUT',
    });
  },
};
