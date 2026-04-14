import type {
  CreateClassPayload,
  CreateClassroomPayload,
  UpdateClassroomPayload,
} from '../dto/classroom.dto';
import type { ClassResource } from '../../../types/server/mirage/class-resource.types';
import type { ClassroomRecord, SchoolEntity } from '../seeds/in-memory-db';
import { MockSchoolRepository } from './mock-school.repository';
import { SchoolAggregateFactory } from './school-aggregate.factory';

export class ClassroomModel {
  public constructor(
    private readonly repository: MockSchoolRepository,
    private readonly factory: SchoolAggregateFactory,
  ) {}

  public listClassrooms(schoolId: string): ClassroomRecord[] | undefined {
    return this.repository.getSchoolById(schoolId)?.classrooms;
  }

  public async createClassroom(
    schoolId: string,
    payload: CreateClassroomPayload,
  ): Promise<SchoolEntity | undefined> {
    const currentSchool = this.repository.getSchoolById(schoolId);

    if (!currentSchool) {
      return undefined;
    }

    const nextSchool: SchoolEntity = {
      ...currentSchool,
      classrooms: [
        ...currentSchool.classrooms,
        this.factory.createClassroomRecord(payload),
      ],
    };

    await this.repository.updateSchool(nextSchool);

    return nextSchool;
  }

  public async updateClassroom(
    schoolId: string,
    classroomId: string,
    payload: UpdateClassroomPayload,
  ): Promise<SchoolEntity | undefined> {
    const currentSchool = this.repository.getSchoolById(schoolId);

    if (!currentSchool) {
      return undefined;
    }

    const currentClassroom = this.findClassroomById(
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
          ? this.factory.createClassroomRecord({
              ...payload,
              id: currentClassroom.id,
            })
          : classroom,
      ),
    };

    await this.repository.updateSchool(nextSchool);

    return nextSchool;
  }

  public async deleteClassroom(
    schoolId: string,
    classroomId: string,
  ): Promise<SchoolEntity | undefined> {
    const currentSchool = this.repository.getSchoolById(schoolId);

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

    await this.repository.updateSchool(nextSchool);

    return nextSchool;
  }

  public getClass(classroomId: string): ClassResource | undefined {
    const match = this.repository.getSchoolWithClassroom(classroomId);

    if (!match) {
      return undefined;
    }

    return this.factory.createClassResource(match.school, match.classroom);
  }

  public listClasses(schoolId?: string): ClassResource[] | undefined {
    if (schoolId) {
      const school = this.repository.getSchoolById(schoolId);

      if (!school) {
        return undefined;
      }

      return school.classrooms.map((classroom) =>
        this.factory.createClassResource(school, classroom),
      );
    }

    return this.repository
      .listSchools()
      .flatMap((school) =>
        school.classrooms.map((classroom) =>
          this.factory.createClassResource(school, classroom),
        ),
      );
  }

  public async createClass(
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

    return this.factory.createClassResource(updatedSchool, createdClassroom);
  }

  public async updateClass(
    classroomId: string,
    payload: UpdateClassroomPayload,
  ): Promise<ClassResource | undefined> {
    const match = this.repository.getSchoolWithClassroom(classroomId);

    if (!match) {
      return undefined;
    }

    await this.updateClassroom(match.school.id, classroomId, payload);

    return this.getClass(classroomId);
  }

  public async deleteClass(classroomId: string): Promise<boolean> {
    const match = this.repository.getSchoolWithClassroom(classroomId);

    if (!match) {
      return false;
    }

    return Boolean(await this.deleteClassroom(match.school.id, classroomId));
  }

  private findClassroomById(
    classrooms: ClassroomRecord[],
    classroomId: string,
  ): ClassroomRecord | undefined {
    return classrooms.find((classroom) => classroom.id === classroomId);
  }
}
