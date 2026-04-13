import type { Request, Response } from 'miragejs';
import type { ZodType } from 'zod';

import { httpResponse } from './http-response';

type RequestBodyValidationFailure = {
  response: Response;
  success: false;
};

type RequestBodyValidationSuccess<T> = {
  data: T;
  success: true;
};

export function validateRequestBody<T>(
  request: Request,
  schema: ZodType<T>,
  invalidPayloadMessage: string,
): RequestBodyValidationFailure | RequestBodyValidationSuccess<T> {
  if (!request.requestBody) {
    return {
      response: httpResponse.badRequest(invalidPayloadMessage),
      success: false,
    };
  }

  let payload: unknown;

  try {
    payload = JSON.parse(request.requestBody);
  } catch {
    return {
      response: httpResponse.badRequest(invalidPayloadMessage),
      success: false,
    };
  }

  const validationResult = schema.safeParse(payload);

  if (!validationResult.success) {
    return {
      response: httpResponse.unprocessableEntity(
        invalidPayloadMessage,
        validationResult.error.flatten(),
      ),
      success: false,
    };
  }

  return {
    data: validationResult.data,
    success: true,
  };
}
