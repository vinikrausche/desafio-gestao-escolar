import { create } from 'zustand';

import { classroomsService } from '../../classrooms/services/classrooms.service';
import { schoolsService } from '../services/schools.service';
import type { SchoolSummary } from '../../../types/features/schools/school.types';
import type {
  SchoolCacheSnapshot,
  SchoolsStoreState,
} from '../../../types/store/schools-store.types';

let schoolsRequest: Promise<SchoolSummary[]> | null = null;

function normalizeSchools(schools: SchoolSummary[]): SchoolCacheSnapshot {
  const schoolsById = schools.reduce<Record<string, SchoolSummary>>(
    (accumulator, school) => {
      accumulator[school.id] = school;
      return accumulator;
    },
    {},
  );

  return {
    schoolIds: schools.map((school) => school.id),
    schoolsById,
  };
}

function readOrderedSchools(state: SchoolsStoreState): SchoolSummary[] {
  return state.schoolIds
    .map((schoolId) => state.schoolsById[schoolId])
    .filter((school): school is SchoolSummary => Boolean(school));
}

function upsertSchool(
  state: SchoolsStoreState,
  nextSchool: SchoolSummary,
): SchoolCacheSnapshot {
  const hasSchool = Boolean(state.schoolsById[nextSchool.id]);

  return {
    schoolIds: hasSchool
      ? state.schoolIds
      : [...state.schoolIds, nextSchool.id],
    schoolsById: {
      ...state.schoolsById,
      [nextSchool.id]: nextSchool,
    },
  };
}

function removeSchool(
  state: SchoolsStoreState,
  schoolId: string,
): SchoolCacheSnapshot {
  const nextSchoolsById = { ...state.schoolsById };
  delete nextSchoolsById[schoolId];

  return {
    schoolIds: state.schoolIds.filter(
      (currentSchoolId) => currentSchoolId !== schoolId,
    ),
    schoolsById: nextSchoolsById,
  };
}

function createReadySchoolState(
  state: SchoolsStoreState,
  nextSchool: SchoolSummary,
) {
  return {
    ...upsertSchool(state, nextSchool),
    errorMessage: null,
    hasLoadedOnce: true,
    status: 'ready' as const,
  };
}

async function requestSchoolsFromApi(): Promise<SchoolSummary[]> {
  if (!schoolsRequest) {
    schoolsRequest = schoolsService.list().finally(() => {
      schoolsRequest = null;
    });
  }

  return schoolsRequest;
}

export const useSchoolsStore = create<SchoolsStoreState>((set, get) => ({
  errorMessage: null,
  hasLoadedOnce: false,
  schoolIds: [],
  schoolsById: {},
  status: 'idle',

  async createSchool(payload) {
    const createdSchool = await schoolsService.create(payload);

    set((state) => createReadySchoolState(state, createdSchool));

    return createdSchool;
  },

  async createClassroom(schoolId, payload) {
    const updatedSchool = await classroomsService.create(schoolId, payload);

    set((state) => createReadySchoolState(state, updatedSchool));

    return updatedSchool;
  },

  async deleteClassroom(schoolId, classroomId) {
    const updatedSchool = await classroomsService.delete(schoolId, classroomId);

    set((state) => createReadySchoolState(state, updatedSchool));

    return updatedSchool;
  },

  async deleteSchool(schoolId) {
    await schoolsService.delete(schoolId);

    set((state) => ({
      ...removeSchool(state, schoolId),
      errorMessage: null,
      status: 'ready',
    }));
  },

  async loadSchools(options = {}) {
    const { force = false } = options;
    const currentState = get();

    if (!force && currentState.hasLoadedOnce) {
      return readOrderedSchools(currentState);
    }

    if (!force && currentState.status === 'loading' && schoolsRequest) {
      return schoolsRequest;
    }

    set({
      errorMessage: null,
      status: 'loading',
    });

    try {
      const schools = await requestSchoolsFromApi();

      set({
        ...normalizeSchools(schools),
        errorMessage: null,
        hasLoadedOnce: true,
        status: 'ready',
      });

      return schools;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel carregar as escolas.';

      set({
        errorMessage: message,
        status: 'error',
      });

      throw error;
    }
  },

  async updateSchool(schoolId, payload) {
    const updatedSchool = await schoolsService.update(schoolId, payload);

    set((state) => createReadySchoolState(state, updatedSchool));

    return updatedSchool;
  },

  async updateClassroom(schoolId, classroomId, payload) {
    const updatedSchool = await classroomsService.update(
      schoolId,
      classroomId,
      payload,
    );

    set((state) => createReadySchoolState(state, updatedSchool));

    return updatedSchool;
  },
}));
