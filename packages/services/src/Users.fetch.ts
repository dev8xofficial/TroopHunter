import { apiRequest } from '@repo/middlewares';
import { type ApiResponse, type IUserAttributes } from '@repo/validator';

interface IGetUserById {
  id: string;
  headers?: Record<string, string>;
}

export const getUserById = async ({ id, headers }: IGetUserById): Promise<ApiResponse<IUserAttributes | null>> => {
  const options = {
    url: `/users/${id}`,
    method: 'GET' as const,
    headers,
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<IUserAttributes>(options);
  return apiResponse;
};

interface IGetUserByEmail {
  email: string;
  headers?: Record<string, string>;
}

export const getUserByEmail = async ({ email, headers }: IGetUserByEmail): Promise<ApiResponse<IUserAttributes | null>> => {
  const options = {
    url: `/users/email/${email}`,
    method: 'GET' as const,
    headers,
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<IUserAttributes>(options);
  return apiResponse;
};
