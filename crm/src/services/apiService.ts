import { type AxiosInstance, type AxiosResponse } from 'axios';
import { type ApiResponse } from 'validator';

const BASE_URL = process.env.BACKEND_URL ?? '';

export const refreshTokenService = async (axiosInstance: AxiosInstance, refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> => {
  try {
    const refreshResponse: AxiosResponse<ApiResponse<{ accessToken: string }>> = await axiosInstance.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
    return refreshResponse.data;
  } catch (error) {
    throw new Error('An error occurred while fetching businesses.');
  }
};
