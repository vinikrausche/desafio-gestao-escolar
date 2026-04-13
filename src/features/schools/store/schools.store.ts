import { create } from 'zustand';

import { schoolsService } from '../services/schools.service';
import type {
  CreateSchoolInput,
  SchoolSummary,
  UpdateSchoolInput,
} from '../school.types';

type ResourceStatus = 'idle' | 'loading' | 'ready' | 'error';

type LoadOptions = {
  force?: boolean;
};

type SchoolCacheSnapshot = {
  schoolIds: string[];
  schoolsById: Record<string, SchoolSummary>;
};

type SchoolsStoreState = {
  errorMessage: string | null;
  hasLoadedOnce: boolean;
  schoolIds: string[];
  schoolsById: Record<string, SchoolSummary>;
  status: ResourceStatus;
  createSchool: (payload: CreateSchoolInput) => Promise<SchoolSummary>;
  deleteSchool: (schoolId: string) => Promise<void>;
  loadSchools: (options?: LoadOptions) => Promise<SchoolSummary[]>;
  updateSchool: (
    schoolId: string,
    payload: UpdateSchoolInput,
  ) => Promise<SchoolSummary>;
};

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

    set((state) => ({
      ...upsertSchool(state, createdSchool),
      errorMessage: null,
      hasLoadedOnce: true,
      status: 'ready',
    }));

    return createdSchool;
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

    set((state) => ({
      ...upsertSchool(state, updatedSchool),
      errorMessage: null,
      hasLoadedOnce: true,
      status: 'ready',
    }));

    return updatedSchool;
  },
}));
