import { apiRequest, type IHttpsAgentOptions } from '@repo/middlewares';
import { type ApiResponse, type ILeadAttributes } from '@repo/validator';

type IGetLeadsByUserId = { userId: string; headers?: Record<string, string> } & IHttpsAgentOptions;

export const getLeadsByUserId = async ({ userId, headers, key, cert, ca, requestCert, rejectUnauthorized }: IGetLeadsByUserId): Promise<ApiResponse<ILeadAttributes[] | null>> => {
  const options = {
    url: `/leads/${userId}`,
    method: 'GET' as const,
    headers,
    httpsAgent: { key, cert, ca, requestCert, rejectUnauthorized },
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<ILeadAttributes[]>(options);
  return apiResponse;
};
