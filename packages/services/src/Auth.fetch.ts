import { apiRequest } from '@repo/middlewares';
import { type ApiResponse } from '@repo/validator';

export interface IVerifyUserToken {
  headers: Record<string, string>;
}

export const verifyUserToken = async ({ headers }: IVerifyUserToken): Promise<ApiResponse<null>> => {
  const options = {
    url: `/auth/verify/token`,
    method: 'GET' as const,
    headers,
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<null>(options);
  return apiResponse;
};
