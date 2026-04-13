import { API_BASE_URL } from './constants';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

type ApiErrorPayload = {
  details?: unknown;
  message?: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function readApiErrorPayload(
  response: Response,
): Promise<ApiErrorPayload | null> {
  try {
    return (await response.json()) as ApiErrorPayload;
  } catch {
    return null;
  }
}

export async function requestJson<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    const errorPayload = await readApiErrorPayload(response);
    const message =
      typeof errorPayload?.message === 'string'
        ? errorPayload.message
        : `API request failed with status ${response.status}`;

    throw new ApiError(message, response.status, errorPayload?.details);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
