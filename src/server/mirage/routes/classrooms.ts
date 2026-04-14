import type { Server } from 'miragejs';

import {
  createClassDtoSchema,
  createClassroomDtoSchema,
  updateClassroomDtoSchema,
} from '../dto/classroom.dto';
import { classroomModel, schoolModel } from '../models/mock-school.model';
import { httpResponse } from '../utils/http-response';
import { validateRequestBody } from '../utils/validate-request-body';

function readSchoolId(params: Record<string, string | undefined>) {
  return params.schoolId;
}

function readClassroomId(params: Record<string, string | undefined>) {
  return params.classroomId;
}

export function registerClassroomRoutes(server: Server) {
  // O recurso plano atende integracoes que esperam um endpoint literal `/classes`.
  server.get('/classes', (_schema, request) => {
    const schoolId =
      typeof request.queryParams.schoolId === 'string'
        ? request.queryParams.schoolId
        : undefined;
    const classes = classroomModel.listClasses(schoolId);

    if (schoolId && !classes) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    return httpResponse.ok(classes ?? []);
  });

  server.get('/classes/:classroomId', (_schema, request) => {
    const classroomId = readClassroomId(request.params);

    if (!classroomId) {
      return httpResponse.notFound('Turma não encontrada.');
    }

    const classroom = classroomModel.getClass(classroomId);

    if (!classroom) {
      return httpResponse.notFound('Turma não encontrada.');
    }

    return httpResponse.ok(classroom);
  });

  server.post('/classes', async (_schema, request) => {
    const validationResult = validateRequestBody(
      request,
      createClassDtoSchema,
      'Payload inválido para criação de turma.',
    );

    if (!validationResult.success) {
      return validationResult.response;
    }

    const createdClass = await classroomModel.createClass(
      validationResult.data,
    );

    if (!createdClass) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    return httpResponse.created(createdClass);
  });

  server.put('/classes/:classroomId', async (_schema, request) => {
    const classroomId = readClassroomId(request.params);

    if (!classroomId) {
      return httpResponse.notFound('Turma não encontrada.');
    }

    const validationResult = validateRequestBody(
      request,
      updateClassroomDtoSchema,
      'Payload inválido para atualização de turma.',
    );

    if (!validationResult.success) {
      return validationResult.response;
    }

    const updatedClass = await classroomModel.updateClass(
      classroomId,
      validationResult.data,
    );

    if (!updatedClass) {
      return httpResponse.notFound('Turma não encontrada.');
    }

    return httpResponse.ok(updatedClass);
  });

  server.delete('/classes/:classroomId', async (_schema, request) => {
    const classroomId = readClassroomId(request.params);

    if (!classroomId) {
      return httpResponse.notFound('Turma não encontrada.');
    }

    const removed = await classroomModel.deleteClass(classroomId);

    if (!removed) {
      return httpResponse.notFound('Turma não encontrada.');
    }

    return httpResponse.noContent();
  });

  server.get('/schools/:schoolId/classrooms', (_schema, request) => {
    const schoolId = readSchoolId(request.params);

    if (!schoolId) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    const classrooms = classroomModel.listClassrooms(schoolId);

    if (!classrooms) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    return httpResponse.ok(classrooms);
  });

  server.post('/schools/:schoolId/classrooms', async (_schema, request) => {
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

    const updatedSchool = await classroomModel.createClassroom(
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
    async (_schema, request) => {
      const schoolId = readSchoolId(request.params);
      const classroomId = readClassroomId(request.params);

      if (!schoolId) {
        return httpResponse.notFound('Escola não encontrada.');
      }

      if (!classroomId) {
        return httpResponse.notFound('Turma não encontrada.');
      }

      if (!schoolModel.get(schoolId)) {
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

      const updatedSchool = await classroomModel.updateClassroom(
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
    async (_schema, request) => {
      const schoolId = readSchoolId(request.params);
      const classroomId = readClassroomId(request.params);

      if (!schoolId) {
        return httpResponse.notFound('Escola não encontrada.');
      }

      if (!classroomId) {
        return httpResponse.notFound('Turma não encontrada.');
      }

      if (!schoolModel.get(schoolId)) {
        return httpResponse.notFound('Escola não encontrada.');
      }

      const updatedSchool = await classroomModel.deleteClassroom(
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
