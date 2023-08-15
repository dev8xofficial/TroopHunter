import axios, { type AxiosResponse } from 'axios';
import { type IUserUpdatePasswordRequestAttributes, type ApiResponse, type IUserAttributes, type IUserUpdateNameRequestAttributes } from 'validator';

import { removeEmptyStringValues } from '../utils/helpers';

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

export const updateUserNameService = async (id: string, data: IUserUpdateNameRequestAttributes, token: string): Promise<ApiResponse<IUserAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<IUserAttributes>> = await axios.put(`${BASE_URL}/users/${id}/update/name`, removeEmptyStringValues(data), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while updating a lead.');
  }
};

export const updateUserPasswordService = async (id: string, data: IUserUpdatePasswordRequestAttributes, token: string): Promise<ApiResponse<IUserAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<IUserAttributes>> = await axios.put(`${BASE_URL}/users/${id}/update/password`, removeEmptyStringValues(data), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while updating a lead.');
  }
};
