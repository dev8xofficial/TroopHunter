import axios, { type AxiosResponse } from 'axios';
import { type ApiResponse, type ILeadAttributes } from 'validator';

import { type IUpdateLeadPayload, type ICreateLeadPayload } from 'store/sagas/leadSaga';

import { removeEmptyStringValues } from '../utils/helpers';

const BASE_URL = process.env.BACKEND_URL ?? '';

export const createLeadService = async (data: Omit<ICreateLeadPayload, 'token' | 'geoPoint' | 'BusinessPhone'>, token: string): Promise<ApiResponse<ILeadAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<ILeadAttributes>> = await axios.post(`${BASE_URL}/leads`, removeEmptyStringValues(data), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while creating a lead.');
  }
};

export const updateLeadService = async (id: string, data: Omit<IUpdateLeadPayload, 'id' | 'token' | 'geoPoint' | 'BusinessPhone'>, token: string): Promise<ApiResponse<ILeadAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<ILeadAttributes>> = await axios.put(`${BASE_URL}/leads/${id}`, removeEmptyStringValues(data), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while updating a lead.');
  }
};

export const deleteLeadService = async (id: string, token: string): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await axios.delete(`${BASE_URL}/leads/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while deleting a lead.');
  }
};

export const deleteLeadsService = async (selectedLeadIds: string[], token: string): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await axios.delete(`${BASE_URL}/leads/bulk`, { data: { selectedLeadIds }, headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while deleting a lead.');
  }
};
