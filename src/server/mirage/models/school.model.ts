import type {
  CreateSchoolPayload,
  UpdateSchoolPayload,
} from '../dto/school.dto';
import type { SchoolEntity } from '../seeds/in-memory-db';
import { MockSchoolRepository } from './mock-school.repository';
import { SchoolAggregateFactory } from './school-aggregate.factory';

export class SchoolModel {
  public constructor(
    private readonly repository: MockSchoolRepository,
    private readonly factory: SchoolAggregateFactory,
  ) {}

  public list(): SchoolEntity[] {
    return this.repository.listSchools();
  }

  public get(schoolId: string): SchoolEntity | undefined {
    return this.repository.getSchoolById(schoolId);
  }

  public async create(payload: CreateSchoolPayload): Promise<SchoolEntity> {
    const nextSchool = this.factory.createSchool(payload);

    await this.repository.createSchool(nextSchool);

    return nextSchool;
  }

  public async update(
    schoolId: string,
    payload: UpdateSchoolPayload,
  ): Promise<SchoolEntity | undefined> {
    const currentSchool = this.get(schoolId);

    if (!currentSchool) {
      return undefined;
    }

    const nextSchool: SchoolEntity = {
      ...currentSchool,
      address: payload.address,
      addressNumber: payload.addressNumber,
      city: payload.city,
      classrooms: payload.classrooms
        ? payload.classrooms.map((classroom) =>
            this.factory.createClassroomRecord(classroom),
          )
        : currentSchool.classrooms,
      district: payload.district,
      name: payload.name,
      photos: payload.photos
        ? payload.photos.map((photo) =>
            this.factory.createSchoolPhotoRecord(photo),
          )
        : currentSchool.photos,
      postalCode: payload.postalCode,
      state: payload.state.toUpperCase(),
    };

    await this.repository.updateSchool(nextSchool);

    return nextSchool;
  }

  public async delete(schoolId: string): Promise<boolean> {
    return this.repository.deleteSchool(schoolId);
  }
}
