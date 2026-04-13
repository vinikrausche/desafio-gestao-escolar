import type {
  CreateSchoolPayload,
  UpdateSchoolPayload,
} from '../dto/school.dto';
import {
  readMockDb,
  type ClassroomRecord,
  type SchoolEntity,
  writeMockDb,
} from '../seeds/in-memory-db';
import { generateModelId } from './model-id';

function buildClassroomRecord(classroom: {
  id?: string;
  name: string;
}): ClassroomRecord {
  return {
    id: classroom.id ?? generateModelId('classroom'),
    name: classroom.name,
  };
}

function buildSchoolEntity(payload: CreateSchoolPayload): SchoolEntity {
  return {
    address: payload.address,
    classrooms: payload.classrooms.map(buildClassroomRecord),
    id: generateModelId('school'),
    name: payload.name,
  };
}

function findSchoolById(
  schools: SchoolEntity[],
  schoolId: string,
): SchoolEntity | undefined {
  return schools.find((school) => school.id === schoolId);
}

function replaceSchool(
  schools: SchoolEntity[],
  nextSchool: SchoolEntity,
): SchoolEntity[] {
  return schools.map((school) =>
    school.id === nextSchool.id ? nextSchool : school,
  );
}

export const schoolModel = {
  create(payload: CreateSchoolPayload): SchoolEntity {
    const snapshot = readMockDb();
    const nextSchool = buildSchoolEntity(payload);

    writeMockDb({
      ...snapshot,
      schools: [...snapshot.schools, nextSchool],
    });

    return nextSchool;
  },

  delete(schoolId: string): boolean {
    const snapshot = readMockDb();
    const nextSchools = snapshot.schools.filter(
      (school) => school.id !== schoolId,
    );

    if (nextSchools.length === snapshot.schools.length) {
      return false;
    }

    writeMockDb({
      ...snapshot,
      schools: nextSchools,
    });

    return true;
  },

  get(schoolId: string): SchoolEntity | undefined {
    const snapshot = readMockDb();
    return findSchoolById(snapshot.schools, schoolId);
  },

  list(): SchoolEntity[] {
    const snapshot = readMockDb();
    return snapshot.schools;
  },

  update(
    schoolId: string,
    payload: UpdateSchoolPayload,
  ): SchoolEntity | undefined {
    const snapshot = readMockDb();
    const currentSchool = findSchoolById(snapshot.schools, schoolId);

    if (!currentSchool) {
      return undefined;
    }

    const nextSchool: SchoolEntity = {
      ...currentSchool,
      address: payload.address,
      classrooms: payload.classrooms.map(buildClassroomRecord),
      name: payload.name,
    };

    writeMockDb({
      ...snapshot,
      schools: replaceSchool(snapshot.schools, nextSchool),
    });

    return nextSchool;
  },
};
