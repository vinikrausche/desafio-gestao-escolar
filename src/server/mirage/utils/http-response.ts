import { Response } from 'miragejs';

type ErrorDetails = Record<string, unknown> | undefined;
type JsonBody =
  | string
  | number
  | boolean
  | null
  | Record<string, unknown>
  | unknown[];
type ResponseHeaders = Record<string, string>;

function normalizeMirageBody(body: JsonBody): string | object {
  if (typeof body === 'string') {
    return body;
  }

  if (typeof body === 'number' || typeof body === 'boolean' || body === null) {
    return JSON.stringify(body);
  }

  return body;
}

function json(status: number, body: JsonBody, headers: ResponseHeaders = {}) {
  return new Response(
    status,
    {
      'Content-Type': 'application/json',
      ...headers,
    },
    normalizeMirageBody(body),
  );
}

function errorBody(message: string, details?: ErrorDetails) {
  if (!details) {
    return { message };
  }

  return {
    details,
    message,
  };
}

export const httpResponse = {
  badRequest(message: string, details?: ErrorDetails) {
    return json(400, errorBody(message, details));
  },
  created(body: JsonBody, headers?: ResponseHeaders) {
    return json(201, body, headers);
  },
  noContent(headers: ResponseHeaders = {}) {
    return new Response(204, headers);
  },
  notFound(message: string, details?: ErrorDetails) {
    return json(404, errorBody(message, details));
  },
  ok(body: JsonBody, headers?: ResponseHeaders) {
    return json(200, body, headers);
  },
  unprocessableEntity(message: string, details?: ErrorDetails) {
    return json(422, errorBody(message, details));
  },
};
