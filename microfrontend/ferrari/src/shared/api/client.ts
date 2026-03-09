import { z } from 'zod';

/**
 * Type-safe API client with Zod response validation.
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

async function baseFetch<T>(url: string, schema: z.ZodType<T>, options: FetchOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest
  });

  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`, await response.json().catch(() => null));
  }

  const data = await response.json();

  // Validate response with Zod schema
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error('[API] Response validation failed:', result.error.flatten());
    throw new ApiError(422, 'Response validation failed', result.error.flatten());
  }

  return result.data;
}

export const api = {
  get: <T>(url: string, schema: z.ZodType<T>, options?: FetchOptions) => baseFetch(url, schema, { ...options, method: 'GET' }),

  post: <T>(url: string, schema: z.ZodType<T>, body: unknown, options?: FetchOptions) => baseFetch(url, schema, { ...options, method: 'POST', body }),

  put: <T>(url: string, schema: z.ZodType<T>, body: unknown, options?: FetchOptions) => baseFetch(url, schema, { ...options, method: 'PUT', body }),

  patch: <T>(url: string, schema: z.ZodType<T>, body: unknown, options?: FetchOptions) => baseFetch(url, schema, { ...options, method: 'PATCH', body }),

  delete: <T>(url: string, schema: z.ZodType<T>, options?: FetchOptions) => baseFetch(url, schema, { ...options, method: 'DELETE' })
};
