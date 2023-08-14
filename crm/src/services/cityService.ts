import axios, { type AxiosResponse } from 'axios';
import { type ApiResponse, type ICityAttributes, type ICityFetchRequestAttributes, type IPaginationAttributes } from 'validator';

import { removeEmptyStringValues } from '../utils/helpers';

const BASE_URL = process.env.BACKEND_URL ?? '';

interface IGetCitiesByQueryAttributes extends ICityFetchRequestAttributes, IPaginationAttributes {}

export const getCitiesByQuery = async (params: IGetCitiesByQueryAttributes, token: string): Promise<ApiResponse<ICityAttributes[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<ICityAttributes[]>> = await axios.get(`${BASE_URL}/cities/search`, { params: removeEmptyStringValues(params), headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching cities.');
  }
};

export const getCityByIdService = async (id: string, token: string): Promise<ApiResponse<ICityAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<ICityAttributes>> = await axios.get(`${BASE_URL}/cities/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching city by ID.');
  }
};
