import https, { type AgentOptions } from 'https';

import { type ApiResponse } from '@repo/validator';
import axios, { type AxiosResponse, type AxiosError } from 'axios';

export interface IHttpsAgentOptions extends AgentOptions {
  key: Buffer | string;
  cert: Buffer | string;
  ca: Buffer | string;
  requestCert: boolean;
  rejectUnauthorized: boolean;
}

export interface ApiRequestOptions {
  baseURL: string;
  url: string;
  httpsAgent: IHttpsAgentOptions;
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
  const httpsAgent = new https.Agent(options.httpsAgent);
  const axiosInstance = axios.create({
    httpsAgent,
    baseURL: options.baseURL,
    headers: mergedHeaders,
    validateStatus: (status) => {
      return status >= 200 && status < 500;
    },
  });

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
