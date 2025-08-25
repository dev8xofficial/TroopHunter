import { type ApiRequestOptions, apiRequest } from '@repo/middlewares';
import { type ApiResponse, type IUserAttributes } from '@repo/validator';

type IUserWithApiRequestEnvConfig = Omit<IUserAttributes, 'Leads'>;

export const createUser = async ({ id, firstName, lastName, email, password, verified }: IUserWithApiRequestEnvConfig): Promise<ApiResponse<Omit<IUserAttributes, 'Leads'> | null>> => {
  const options: ApiRequestOptions = {
    url: `/users/create`,
    method: 'POST' as const,
    data: { id, firstName, lastName, email, password, verified },
    baseURL: process.env.MAIN_MICROSERVICE_URL ?? '',
  };

  const apiResponse = await apiRequest<Omit<IUserAttributes, 'Leads'>>(options);
  return apiResponse;
};
