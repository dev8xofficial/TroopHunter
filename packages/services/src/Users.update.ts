import { apiRequest } from '@repo/middlewares';
import { type ApiResponse, type IUserAttributes } from '@repo/validator';

interface IUpdateUserVerified {
  id: string;
  verified: boolean;
}

export const updateUserVerified = async ({ id, verified }: IUpdateUserVerified): Promise<ApiResponse<IUserAttributes | null>> => {
  const options = {
    url: `/users/${id}/update/verified`,
    method: 'PUT' as const,
    data: { verified },
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<IUserAttributes>(options);
  return apiResponse;
};

interface IUpdateUserPassword {
  id: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export const updateUserPassword = async ({ id, password, newPassword, confirmPassword }: IUpdateUserPassword): Promise<ApiResponse<IUserAttributes | null>> => {
  const options = {
    url: `/users/${id}/update/password`,
    method: 'PUT' as const,
    data: { password, newPassword, confirmPassword },
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<IUserAttributes>(options);
  return apiResponse;
};
