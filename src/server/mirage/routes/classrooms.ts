import type { Server } from 'miragejs';

import {
  createClassroomDtoSchema,
  updateClassroomDtoSchema,
} from '../dto/classroom.dto';
import { mockSchoolModel } from '../models/mock-school.model';
import { httpResponse } from '../utils/http-response';
import { validateRequestBody } from '../utils/validate-request-body';

function readSchoolId(params: Record<string, string | undefined>) {
  return params.schoolId;
}

function readClassroomId(params: Record<string, string | undefined>) {
  return params.classroomId;
}

export function registerClassroomRoutes(server: Server) {
  server.get('/schools/:schoolId/classrooms', (_schema, request) => {
    const schoolId = readSchoolId(request.params);

    if (!schoolId) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    const classrooms = mockSchoolModel.listClassrooms(schoolId);

    if (!classrooms) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    return httpResponse.ok(classrooms);
  });

  server.post('/schools/:schoolId/classrooms', (_schema, request) => {
    const schoolId = readSchoolId(request.params);

    if (!schoolId) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    const validationResult = validateRequestBody(
      request,
      createClassroomDtoSchema,
      'Payload inválido para criação de turma.',
    );

    if (!validationResult.success) {
      return validationResult.response;
    }

    const updatedSchool = mockSchoolModel.createClassroom(
      schoolId,
      validationResult.data,
    );

    if (!updatedSchool) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    return httpResponse.created(updatedSchool);
  });

  server.put(
    '/schools/:schoolId/classrooms/:classroomId',
    (_schema, request) => {
      const schoolId = readSchoolId(request.params);
      const classroomId = readClassroomId(request.params);

      if (!schoolId) {
        return httpResponse.notFound('Escola não encontrada.');
      }

      if (!classroomId) {
        return httpResponse.notFound('Turma não encontrada.');
      }

      if (!mockSchoolModel.getSchool(schoolId)) {
        return httpResponse.notFound('Escola não encontrada.');
      }

      const validationResult = validateRequestBody(
        request,
        updateClassroomDtoSchema,
        'Payload inválido para atualização de turma.',
      );

      if (!validationResult.success) {
        return validationResult.response;
      }

      const updatedSchool = mockSchoolModel.updateClassroom(
        schoolId,
        classroomId,
        validationResult.data,
      );

      if (!updatedSchool) {
        return httpResponse.notFound('Turma não encontrada.');
      }

      return httpResponse.ok(updatedSchool);
    },
  );

  server.delete(
    '/schools/:schoolId/classrooms/:classroomId',
    (_schema, request) => {
      const schoolId = readSchoolId(request.params);
      const classroomId = readClassroomId(request.params);

      if (!schoolId) {
        return httpResponse.notFound('Escola não encontrada.');
      }

      if (!classroomId) {
        return httpResponse.notFound('Turma não encontrada.');
      }

      if (!mockSchoolModel.getSchool(schoolId)) {
        return httpResponse.notFound('Escola não encontrada.');
      }

      const updatedSchool = mockSchoolModel.deleteClassroom(
        schoolId,
        classroomId,
      );

      if (!updatedSchool) {
        return httpResponse.notFound('Turma não encontrada.');
      }

      return httpResponse.ok(updatedSchool);
    },
  );
}
