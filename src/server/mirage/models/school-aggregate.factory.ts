import type { CreateSchoolPayload } from '../dto/school.dto';
import type { ClassResource } from '../../../types/server/mirage/class-resource.types';
import type { ClassroomRecord, SchoolEntity } from '../seeds/in-memory-db';
import { generateModelId } from './model-id';

type ClassroomDraft = {
  id?: string;
  name: string;
  schoolYear: string;
  shift: ClassroomRecord['shift'];
};

export class SchoolAggregateFactory {
  public createSchool(payload: CreateSchoolPayload): SchoolEntity {
    return {
      address: payload.address,
      classrooms: payload.classrooms.map((classroom) =>
        this.createClassroomRecord(classroom),
      ),
      id: generateModelId('school'),
      name: payload.name,
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
