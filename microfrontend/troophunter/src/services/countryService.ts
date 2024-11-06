import { type IPaginationAttributes, type ApiResponse, type ICountryFetchRequestAttributes } from '@repo/validator';
import axios, { type AxiosResponse } from 'axios';

import { type ICountriesResponseAttributes, type ICountryResponseAttributes } from '../components/Inputs/Combobox/Combobox';

const BASE_URL = process.env.VITE_BACKEND_URL;

interface IGetCountriesByQueryAttributes extends ICountryFetchRequestAttributes, IPaginationAttributes {}

export const getCountriesByQuery = async (params: IGetCountriesByQueryAttributes, accessToken: string): Promise<ApiResponse<ICountriesResponseAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<ICountriesResponseAttributes>> = await axios.get(`${BASE_URL}/countries/search`, { params, headers: { Authorization: `Bearer ${accessToken}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching countries.');
  }
};

export const getCountryByIdService = async (id: string, accessToken: string): Promise<ApiResponse<ICountryResponseAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<ICountryResponseAttributes>> = await axios.get(`${BASE_URL}/countries/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching country by ID.');
  }
};
