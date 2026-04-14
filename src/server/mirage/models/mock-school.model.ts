import type {
  CreateClassPayload,
  CreateClassroomPayload,
  UpdateClassroomPayload,
} from '../dto/classroom.dto';
import type {
  CreateSchoolPayload,
  UpdateSchoolPayload,
} from '../dto/school.dto';
import type { ClassResource } from '../../../types/server/mirage/class-resource.types';
import type { ClassroomRecord, SchoolEntity } from '../seeds/in-memory-db';
import { ClassroomModel } from './classroom.model';
import { MockSchoolRepository } from './mock-school.repository';
import { SchoolAggregateFactory } from './school-aggregate.factory';
import { SchoolModel } from './school.model';

export class MockSchoolModel {
  public constructor(
    private readonly schoolModel: SchoolModel,
    private readonly classroomModel: ClassroomModel,
  ) {}

  public listSchools(): SchoolEntity[] {
    return this.schoolModel.list();
  }

  public getSchool(schoolId: string): SchoolEntity | undefined {
    return this.schoolModel.get(schoolId);
  }

  public async createSchool(
    payload: CreateSchoolPayload,
  ): Promise<SchoolEntity> {
    return this.schoolModel.create(payload);
  }

  public async updateSchool(
    schoolId: string,
    payload: UpdateSchoolPayload,
  ): Promise<SchoolEntity | undefined> {
    return this.schoolModel.update(schoolId, payload);
  }

  public async deleteSchool(schoolId: string): Promise<boolean> {
    return this.schoolModel.delete(schoolId);
  }

  public listClassrooms(schoolId: string): ClassroomRecord[] | undefined {
    return this.classroomModel.listClassrooms(schoolId);
  }

  public async createClassroom(
    schoolId: string,
    payload: CreateClassroomPayload,
  ): Promise<SchoolEntity | undefined> {
    return this.classroomModel.createClassroom(schoolId, payload);
  }

  public async updateClassroom(
    schoolId: string,
    classroomId: string,
    payload: UpdateClassroomPayload,
  ): Promise<SchoolEntity | undefined> {
    return this.classroomModel.updateClassroom(schoolId, classroomId, payload);
  }

  public async deleteClassroom(
    schoolId: string,
    classroomId: string,
  ): Promise<SchoolEntity | undefined> {
    return this.classroomModel.deleteClassroom(schoolId, classroomId);
  }

  public listClasses(schoolId?: string): ClassResource[] | undefined {
    return this.classroomModel.listClasses(schoolId);
  }

  public getClass(classroomId: string): ClassResource | undefined {
    return this.classroomModel.getClass(classroomId);
  }

  public async createClass(
    payload: CreateClassPayload,
  ): Promise<ClassResource | undefined> {
    return this.classroomModel.createClass(payload);
  }

  public async updateClass(
    classroomId: string,
    payload: UpdateClassroomPayload,
  ): Promise<ClassResource | undefined> {
    return this.classroomModel.updateClass(classroomId, payload);
  }

  public async deleteClass(classroomId: string): Promise<boolean> {
    return this.classroomModel.deleteClass(classroomId);
  }
}

const repository = new MockSchoolRepository();
const factory = new SchoolAggregateFactory();

// Mantem uma fachada estável para as rotas, mesmo com a lógica separada internamente.
export const schoolModel = new SchoolModel(repository, factory);
export const classroomModel = new ClassroomModel(repository, factory);
export const mockSchoolModel = new MockSchoolModel(schoolModel, classroomModel);
