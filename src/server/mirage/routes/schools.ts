import type { Server } from 'miragejs';

import {
  createSchoolDtoSchema,
  updateSchoolDtoSchema,
} from '../dto/school.dto';
import { schoolModel } from '../models/mock-school.model';
import { httpResponse } from '../utils/http-response';
import { validateRequestBody } from '../utils/validate-request-body';

export function registerSchoolRoutes(server: Server) {
  server.get('/schools', () => {
    return httpResponse.ok(schoolModel.list());
  });

  server.post('/schools', async (_schema, request) => {
    const validationResult = validateRequestBody(
      request,
      createSchoolDtoSchema,
      'Payload inválido para criação de escola.',
    );

    if (!validationResult.success) {
      return validationResult.response;
    }

    return httpResponse.created(
      await schoolModel.create(validationResult.data),
    );
  });

  server.put('/schools/:schoolId', async (_schema, request) => {
    const schoolId = request.params.schoolId;

    if (!schoolId) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    const validationResult = validateRequestBody(
      request,
      updateSchoolDtoSchema,
      'Payload inválido para atualização de escola.',
    );

    if (!validationResult.success) {
      return validationResult.response;
    }

    const nextSchool = await schoolModel.update(
      schoolId,
      validationResult.data,
    );

    if (!nextSchool) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    return httpResponse.ok(nextSchool);
  });

  server.delete('/schools/:schoolId', async (_schema, request) => {
    const schoolId = request.params.schoolId;

    if (!schoolId) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    const removed = await schoolModel.delete(schoolId);

    if (!removed) {
      return httpResponse.notFound('Escola não encontrada.');
    }

    return httpResponse.noContent();
  });
}
