import { type ApiResponse } from '@repo/validator';
import axios, { type AxiosResponse, type AxiosError } from 'axios';

export interface ApiRequestOptions {
  baseURL: string;
  url: string;
  headers?: Record<string, string>;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export const apiRequest = async <T>(options: ApiRequestOptions): Promise<ApiResponse<T>> => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const mergedHeaders = {
    ...options.headers,
    ...headers,
  };
  const axiosConfig: {
    baseURL: string;
    headers: Record<string, string>;
    validateStatus: (status: number) => boolean;
  } = {
    baseURL: options.baseURL,
    headers: mergedHeaders,
    validateStatus: (status: number) => status >= 200 && status < 500,
  };
  const axiosInstance = axios.create(axiosConfig);

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.request({
      url: options.url,
      method: options.method,
      params: options.params,
      data: options.data,
      headers: options.headers,
    });

    if (response.data.status === 406) {
      try {
        const retryHeaders = {
          'Content-Type': 'application/json',
        };
        const mergedRetryHeaders = {
          ...options.headers,
          ...retryHeaders,
        };
        const retryResponse: AxiosResponse<ApiResponse<T>> = await axiosInstance.request({
          url: options.url,
          method: options.method,
          params: options.params,
          data: options.data,
          headers: mergedRetryHeaders,
        });
        return retryResponse.data;
      } catch (error) {
        return { success: false, status: 401, error: 'Unauthorized: Invalid refresh token.' };
      }
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    if (axiosError.response != null) {
      const errorMessage = axiosError.response.data.error ?? 'An internal server error occurred.';
      return { success: false, status: axiosError.response.status, error: errorMessage };
    } else {
      return { success: false, status: 500, error: 'Internal Server Error' };
    }
  }
};
