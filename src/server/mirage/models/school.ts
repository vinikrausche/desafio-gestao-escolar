import type {
  CreateClassPayload,
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

export type ClassResource = ClassroomRecord & {
  schoolId: string;
  schoolName: string;
};

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

function buildClassResource(
  school: SchoolEntity,
  classroom: ClassroomRecord,
): ClassResource {
  return {
    ...classroom,
    schoolId: school.id,
    schoolName: school.name,
  };
}

function findSchoolWithClassroomById(
  schools: SchoolEntity[],
  classroomId: string,
): { classroom: ClassroomRecord; school: SchoolEntity } | undefined {
  for (const school of schools) {
    const classroom = findClassroomById(school.classrooms, classroomId);

    if (classroom) {
      return {
        classroom,
        school,
      };
    }
  }

  return undefined;
}

export const schoolModel = {
  async create(payload: CreateSchoolPayload): Promise<SchoolEntity> {
    const snapshot = readMockDb();
    const nextSchool = buildSchoolEntity(payload);

    await writeMockDb({
      ...snapshot,
      schools: [...snapshot.schools, nextSchool],
    });

    return nextSchool;
  },

  async delete(schoolId: string): Promise<boolean> {
    const snapshot = readMockDb();
    const nextSchools = snapshot.schools.filter(
      (school) => school.id !== schoolId,
    );

    if (nextSchools.length === snapshot.schools.length) {
      return false;
    }

    await writeMockDb({
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

  async update(
    schoolId: string,
    payload: UpdateSchoolPayload,
  ): Promise<SchoolEntity | undefined> {
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

    await writeMockDb({
      ...snapshot,
      schools: replaceSchool(snapshot.schools, nextSchool),
    });

    return nextSchool;
  },

  async createClassroom(
    schoolId: string,
    payload: CreateClassroomPayload,
  ): Promise<SchoolEntity | undefined> {
    const snapshot = readMockDb();
    const currentSchool = findSchoolById(snapshot.schools, schoolId);

    if (!currentSchool) {
      return undefined;
    }

    const nextSchool: SchoolEntity = {
      ...currentSchool,
      classrooms: [...currentSchool.classrooms, buildClassroomRecord(payload)],
    };

    await writeMockDb({
      ...snapshot,
      schools: replaceSchool(snapshot.schools, nextSchool),
    });

    return nextSchool;
  },

  async deleteClassroom(
    schoolId: string,
    classroomId: string,
  ): Promise<SchoolEntity | undefined> {
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

    await writeMockDb({
      ...snapshot,
      schools: replaceSchool(snapshot.schools, nextSchool),
    });

    return nextSchool;
  },

  listClassrooms(schoolId: string): ClassroomRecord[] | undefined {
    const school = this.get(schoolId);
    return school?.classrooms;
  },

  getClass(classroomId: string): ClassResource | undefined {
    const snapshot = readMockDb();
    const match = findSchoolWithClassroomById(snapshot.schools, classroomId);

    if (!match) {
      return undefined;
    }

    return buildClassResource(match.school, match.classroom);
  },

  listClasses(schoolId?: string): ClassResource[] | undefined {
    const snapshot = readMockDb();

    if (schoolId) {
      const school = findSchoolById(snapshot.schools, schoolId);

      if (!school) {
        return undefined;
      }

      return school.classrooms.map((classroom) =>
        buildClassResource(school, classroom),
      );
    }

    return snapshot.schools.flatMap((school) =>
      school.classrooms.map((classroom) =>
        buildClassResource(school, classroom),
      ),
    );
  },

  async createClass(
    payload: CreateClassPayload,
  ): Promise<ClassResource | undefined> {
    const updatedSchool = await this.createClassroom(payload.schoolId, payload);

    if (!updatedSchool) {
      return undefined;
    }

    const createdClassroom = updatedSchool.classrooms.at(-1);

    if (!createdClassroom) {
      return undefined;
    }

    return buildClassResource(updatedSchool, createdClassroom);
  },

  async updateClassroom(
    schoolId: string,
    classroomId: string,
    payload: UpdateClassroomPayload,
  ): Promise<SchoolEntity | undefined> {
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

    await writeMockDb({
      ...snapshot,
      schools: replaceSchool(snapshot.schools, nextSchool),
    });

    return nextSchool;
  },

  async updateClass(
    classroomId: string,
    payload: UpdateClassroomPayload,
  ): Promise<ClassResource | undefined> {
    const snapshot = readMockDb();
    const match = findSchoolWithClassroomById(snapshot.schools, classroomId);

    if (!match) {
      return undefined;
    }

    await this.updateClassroom(match.school.id, classroomId, payload);

    return this.getClass(classroomId);
  },

  async deleteClass(classroomId: string): Promise<boolean> {
    const snapshot = readMockDb();
    const match = findSchoolWithClassroomById(snapshot.schools, classroomId);

    if (!match) {
      return false;
    }

    return Boolean(await this.deleteClassroom(match.school.id, classroomId));
  },
};
