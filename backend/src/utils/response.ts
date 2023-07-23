import { ApiResponse } from '../types/response'; // Assuming ApiResponse interface is imported from a separate file.

export function createApiResponse<T>({ success = false, data, message, error, status }: { success?: boolean; data?: T; message?: string; error?: string; status?: number }): ApiResponse<T> {
  return {
    success,
    data,
    message,
    error,
    status,
  };
}
