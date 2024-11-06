import { type ApiResponse, type ICityFetchRequestAttributes, type IPaginationAttributes } from '@repo/validator';
import axios, { type AxiosResponse } from 'axios';

import { type ICitiesResponseAttributes, type ICityResponseAttributes } from '../components/Inputs/Combobox/Combobox';

const BASE_URL = process.env.BACKEND_URL;

interface IGetCitiesByQueryAttributes extends ICityFetchRequestAttributes, IPaginationAttributes {}

export const getCitiesByQuery = async (params: IGetCitiesByQueryAttributes, accessToken: string): Promise<ApiResponse<ICitiesResponseAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<ICitiesResponseAttributes>> = await axios.get(`${BASE_URL}/cities/search`, { params, headers: { Authorization: `Bearer ${accessToken}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching cities.');
  }
};

export const getCityByIdService = async (id: string, accessToken: string): Promise<ApiResponse<ICityResponseAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<ICityResponseAttributes>> = await axios.get(`${BASE_URL}/cities/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching city by ID.');
  }
};
