import type {
  CreateClassroomPayload,
  UpdateClassroomPayload,
} from '../dto/classroom.dto';
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
  schoolYear: string;
  shift: ClassroomRecord['shift'];
}): ClassroomRecord {
  return {
    id: classroom.id ?? generateModelId('classroom'),
    name: classroom.name,
    schoolYear: classroom.schoolYear,
    shift: classroom.shift,
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

function findClassroomById(
  classrooms: ClassroomRecord[],
  classroomId: string,
): ClassroomRecord | undefined {
  return classrooms.find((classroom) => classroom.id === classroomId);
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
      classrooms: payload.classrooms
        ? payload.classrooms.map(buildClassroomRecord)
        : currentSchool.classrooms,
      name: payload.name,
    };

    writeMockDb({
      ...snapshot,
      schools: replaceSchool(snapshot.schools, nextSchool),
    });

    return nextSchool;
  },

  createClassroom(
    schoolId: string,
    payload: CreateClassroomPayload,
  ): SchoolEntity | undefined {
    const snapshot = readMockDb();
    const currentSchool = findSchoolById(snapshot.schools, schoolId);

    if (!currentSchool) {
      return undefined;
    }

    const nextSchool: SchoolEntity = {
      ...currentSchool,
      classrooms: [...currentSchool.classrooms, buildClassroomRecord(payload)],
    };

    writeMockDb({
      ...snapshot,
      schools: replaceSchool(snapshot.schools, nextSchool),
    });

    return nextSchool;
  },

  deleteClassroom(
    schoolId: string,
    classroomId: string,
  ): SchoolEntity | undefined {
    const snapshot = readMockDb();
    const currentSchool = findSchoolById(snapshot.schools, schoolId);

    if (!currentSchool) {
      return undefined;
    }

    const nextClassrooms = currentSchool.classrooms.filter(
      (classroom) => classroom.id !== classroomId,
    );

    if (nextClassrooms.length === currentSchool.classrooms.length) {
      return undefined;
    }

    const nextSchool: SchoolEntity = {
      ...currentSchool,
      classrooms: nextClassrooms,
    };

    writeMockDb({
      ...snapshot,
      schools: replaceSchool(snapshot.schools, nextSchool),
    });

    return nextSchool;
  },

  listClassrooms(schoolId: string): ClassroomRecord[] | undefined {
    const school = this.get(schoolId);
    return school?.classrooms;
  },

  updateClassroom(
    schoolId: string,
    classroomId: string,
    payload: UpdateClassroomPayload,
  ): SchoolEntity | undefined {
    const snapshot = readMockDb();
    const currentSchool = findSchoolById(snapshot.schools, schoolId);

    if (!currentSchool) {
      return undefined;
    }

    const currentClassroom = findClassroomById(
      currentSchool.classrooms,
      classroomId,
    );

    if (!currentClassroom) {
      return undefined;
    }

    const nextSchool: SchoolEntity = {
      ...currentSchool,
      classrooms: currentSchool.classrooms.map((classroom) =>
        classroom.id === classroomId
          ? buildClassroomRecord({
              ...payload,
              id: currentClassroom.id,
            })
          : classroom,
      ),
    };

    writeMockDb({
      ...snapshot,
      schools: replaceSchool(snapshot.schools, nextSchool),
    });

    return nextSchool;
  },
};
