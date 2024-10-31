import { apiRequest, type IHttpsAgentOptions } from '@repo/middlewares';
import { type ApiResponse } from '@repo/validator';

export type IVerifyUserToken = { headers: Record<string, string> } & IHttpsAgentOptions;

export const verifyUserToken = async ({ headers, key, cert, ca, requestCert, rejectUnauthorized }: IVerifyUserToken): Promise<ApiResponse<null>> => {
  const options = {
    url: `/auth/verify/token`,
    method: 'GET' as const,
    headers,
    httpsAgent: { key, cert, ca, requestCert, rejectUnauthorized },
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<null>(options);
  return apiResponse;
};
