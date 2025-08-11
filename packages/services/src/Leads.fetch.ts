import { apiRequest } from '@repo/middlewares';
import { type ApiResponse, type ILeadAttributes } from '@repo/validator';

interface IGetLeadsByUserId {
  userId: string;
  headers?: Record<string, string>;
}

export const getLeadsByUserId = async ({ userId, headers }: IGetLeadsByUserId): Promise<ApiResponse<{ totalRecords: number; totalPages: number; leads: ILeadAttributes[] }>> => {
  const options = {
    url: `/leads/user/${userId}`,
    method: 'GET' as const,
    headers,
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<{ totalRecords: number; totalPages: number; leads: ILeadAttributes[] }>(options);
  return apiResponse;
};
