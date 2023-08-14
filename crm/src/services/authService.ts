import axios, { type AxiosResponse } from 'axios';
import { type IUserAttributes, type ApiResponse, type ILoginRequestAttributes, type IUserCreateRequestAttributes } from 'validator';

import { type IAuthLoginSuccessPayload } from 'store/reducers/authReducer';

import { removeEmptyStringValues } from '../utils/helpers';

const BASE_URL = process.env.BACKEND_URL ?? '';

export const loginService = async (userData: ILoginRequestAttributes): Promise<ApiResponse<IAuthLoginSuccessPayload>> => {
  try {
    const response: AxiosResponse<ApiResponse<IAuthLoginSuccessPayload>> = await axios.post(`${BASE_URL}/auth/signin`, removeEmptyStringValues(userData));
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while logging in.');
  }
};

export const registerService = async (userData: IUserCreateRequestAttributes): Promise<ApiResponse<IUserAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<IUserAttributes>> = await axios.post(`${BASE_URL}/auth/signup`, removeEmptyStringValues(userData));
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while registering.');
  }
};
