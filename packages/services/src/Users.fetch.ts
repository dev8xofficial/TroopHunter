import { apiRequest, type IHttpsAgentOptions } from '@repo/middlewares';
import { type ApiResponse, type IUserAttributes } from '@repo/validator';

type IGetUserById = { id: string; headers?: Record<string, string> } & IHttpsAgentOptions;

export const getUserById = async ({ id, headers, key, cert, ca, requestCert, rejectUnauthorized }: IGetUserById): Promise<ApiResponse<IUserAttributes | null>> => {
  const options = {
    url: `/users/${id}`,
    method: 'GET' as const,
    headers,
    httpsAgent: { key, cert, ca, requestCert, rejectUnauthorized },
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<IUserAttributes>(options);
  return apiResponse;
};

type IGetUserByEmail = { email: string; headers?: Record<string, string> } & IHttpsAgentOptions;

export const getUserByEmail = async ({ email, headers, key, cert, ca, requestCert, rejectUnauthorized }: IGetUserByEmail): Promise<ApiResponse<IUserAttributes | null>> => {
  const options = {
    url: `/users/email/${email}`,
    method: 'GET' as const,
    headers,
    httpsAgent: { key, cert, ca, requestCert, rejectUnauthorized },
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<IUserAttributes>(options);
  return apiResponse;
};
