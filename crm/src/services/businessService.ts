import axios, { type AxiosResponse } from 'axios';
import { type ApiResponse } from 'validator';

import { type IBusinessState } from 'store/reducers/businessReducer';
import { type IBusinessesFetchPayload } from 'store/sagas/businessSaga';

import { removeEmptyStringValues } from '../utils/helpers';

const BASE_URL = process.env.BACKEND_URL ?? '';

export const getBusinessesBySearchService = async (params: Omit<IBusinessesFetchPayload, 'token' | 'geoPoint' | 'BusinessPhone'>, token: string): Promise<ApiResponse<IBusinessState>> => {
  try {
    const response: AxiosResponse<ApiResponse<IBusinessState>> = await axios.get(`${BASE_URL}/businesses/search`, { params: removeEmptyStringValues(params), headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching businesses.');
  }
};

// export const getBusinessesService = async (token: string) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/businesses`, { headers: { Authorization: `Bearer ${token}` } });
//     return response.data; // Assuming you want to return the data from the response
//   } catch (error) {
//     throw new Error('An error occurred while fetching businesses.');
//   }
// };

// export const getBusinessByIdService = async (id: string, token: string) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/businesses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     return response.data; // Assuming you want to return the data from the response
//   } catch (error) {
//     throw new Error('An error occurred while fetching business by ID.');
//   }
// };

// export const createBusinessService = async (data: any, token: string) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/businesses`, removeEmptyStringValues(data), { headers: { Authorization: `Bearer ${token}` } });
//     return response.data; // Assuming you want to return the data from the response
//   } catch (error) {
//     throw new Error('An error occurred while creating a business.');
//   }
// };

// export const updateBusinessService = async (id: string, data: any, token: string) => {
//   try {
//     const response = await axios.put(`${BASE_URL}/businesses/${id}`, removeEmptyStringValues(data), { headers: { Authorization: `Bearer ${token}` } });
//     return response.data; // Assuming you want to return the data from the response
//   } catch (error) {
//     throw new Error('An error occurred while updating a business.');
//   }
// };

// export const deleteBusinessService = async (id: string, token: string) => {
//   try {
//     const response = await axios.delete(`${BASE_URL}/businesses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     return response.data;
//   } catch (error) {
//     throw new Error('An error occurred while deleting a business.');
//   }
// };
