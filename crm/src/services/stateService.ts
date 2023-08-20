import axios, { type AxiosResponse } from 'axios';
import { type ApiResponse, type IPaginationAttributes, type IStateFetchRequestAttributes } from 'validator';

import { type IStatesResponseAttributes, type IStateResponseAttributes } from 'components/Inputs/Combobox/Combobox';

const BASE_URL = process.env.BACKEND_URL ?? '';

interface IGetStatesByQueryAttributes extends IStateFetchRequestAttributes, IPaginationAttributes {}

export const getStatesByQuery = async (params: IGetStatesByQueryAttributes, accessToken: string): Promise<ApiResponse<IStatesResponseAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<IStatesResponseAttributes>> = await axios.get(`${BASE_URL}/states/search`, { params, headers: { Authorization: `Bearer ${accessToken}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching states.');
  }
};

export const getStateByIdService = async (id: string, accessToken: string): Promise<ApiResponse<IStateResponseAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<IStateResponseAttributes>> = await axios.get(`${BASE_URL}/states/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching state by ID.');
  }
};
