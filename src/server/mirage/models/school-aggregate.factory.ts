import type { CreateSchoolPayload } from '../dto/school.dto';
import type { ClassResource } from '../../../types/server/mirage/class-resource.types';
import type {
  ClassroomRecord,
  SchoolEntity,
  SchoolPhotoRecord,
} from '../seeds/in-memory-db';
import { generateModelId } from './model-id';

type ClassroomDraft = {
  id?: string;
  name: string;
  schoolYear: string;
  shift: ClassroomRecord['shift'];
};

type SchoolPhotoDraft = {
  id?: string;
  uri: string;
};

export class SchoolAggregateFactory {
  public createSchool(payload: CreateSchoolPayload): SchoolEntity {
    return {
      address: payload.address,
      addressNumber: payload.addressNumber,
      city: payload.city,
      classrooms: payload.classrooms.map((classroom) =>
        this.createClassroomRecord(classroom),
      ),
      district: payload.district,
      id: generateModelId('school'),
      name: payload.name,
      photos: payload.photos.map((photo) =>
        this.createSchoolPhotoRecord(photo),
      ),
      postalCode: payload.postalCode,
      state: payload.state.toUpperCase(),
    };
  }

  public createClassroomRecord(payload: ClassroomDraft): ClassroomRecord {
    return {
      id: payload.id ?? generateModelId('classroom'),
      name: payload.name,
      schoolYear: payload.schoolYear,
      shift: payload.shift,
    };
  }

  public createSchoolPhotoRecord(payload: SchoolPhotoDraft): SchoolPhotoRecord {
    return {
      id: payload.id ?? generateModelId('school-photo'),
      uri: payload.uri,
    };
  }

  public createClassResource(
    school: SchoolEntity,
    classroom: ClassroomRecord,
  ): ClassResource {
    // O endpoint /classes expõe a turma em formato plano sem duplicar a persistência.
    return {
      ...classroom,
      schoolId: school.id,
      schoolName: school.name,
    };
  }
}
