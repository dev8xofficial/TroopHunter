import axios, { type AxiosResponse } from 'axios';
import { type ApiResponse, type IUserAttributes } from 'validator';

const BASE_URL = process.env.BACKEND_URL ?? '';

interface IParamsAttribute {
  include: string;
}

export const getUserWithIncludeService = async (userId: string, token: string, params: IParamsAttribute): Promise<ApiResponse<IUserAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<IUserAttributes>> = await axios.get(`${BASE_URL}/users/${userId}/include`, { params, headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching user by ID.');
  }
};
