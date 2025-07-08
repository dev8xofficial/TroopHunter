import { apiRequest } from '@repo/middlewares';
import { type ApiResponse, type ILeadAttributes } from '@repo/validator';

interface IGetLeadsByUserId {
  userId: string;
  headers?: Record<string, string>;
}

export const getLeadsByUserId = async ({ userId, headers }: IGetLeadsByUserId): Promise<ApiResponse<ILeadAttributes[] | null>> => {
  const options = {
    url: `/leads/${userId}`,
    method: 'GET' as const,
    headers,
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<ILeadAttributes[]>(options);
  return apiResponse;
};
