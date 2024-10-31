import { apiRequest, type IHttpsAgentOptions } from '@repo/middlewares';
import { type ApiResponse, type IUserAttributes } from '@repo/validator';

type IUpdateUserVerified = { id: string; verified: boolean } & IHttpsAgentOptions;

export const updateUserVerified = async ({ id, verified, key, cert, ca, requestCert, rejectUnauthorized }: IUpdateUserVerified): Promise<ApiResponse<IUserAttributes | null>> => {
  const options = {
    url: `/users/${id}/update/verified`,
    method: 'PUT' as const,
    data: { verified },
    httpsAgent: { key, cert, ca, requestCert, rejectUnauthorized },
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<IUserAttributes>(options);
  return apiResponse;
};

type IUpdateUserPassword = { id: string; password: string; newPassword: string; confirmPassword: string } & IHttpsAgentOptions;

export const updateUserPassword = async ({ id, password, newPassword, confirmPassword, key, cert, ca, requestCert, rejectUnauthorized }: IUpdateUserPassword): Promise<ApiResponse<IUserAttributes | null>> => {
  const options = {
    url: `/users/${id}/update/password`,
    method: 'PUT' as const,
    data: { password, newPassword, confirmPassword },
    httpsAgent: { key, cert, ca, requestCert, rejectUnauthorized },
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<IUserAttributes>(options);
  return apiResponse;
};
