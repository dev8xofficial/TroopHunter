import axios, { type AxiosResponse } from 'axios';
import { type ApiResponse, type IPaginationAttributes, type IStateAttributes, type IStateFetchRequestAttributes } from 'validator';

import { removeEmptyStringValues } from '../utils/helpers';

const BASE_URL = process.env.BACKEND_URL ?? '';

interface IGetStatesByQueryAttributes extends IStateFetchRequestAttributes, IPaginationAttributes {}

export const getStatesByQuery = async (params: IGetStatesByQueryAttributes, token: string): Promise<ApiResponse<IStateAttributes[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<IStateAttributes[]>> = await axios.get(`${BASE_URL}/states/search`, { params: removeEmptyStringValues(params), headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching states.');
  }
};

export const getStateByIdService = async (id: string, token: string): Promise<ApiResponse<IStateAttributes>> => {
  try {
    const response: AxiosResponse<ApiResponse<IStateAttributes>> = await axios.get(`${BASE_URL}/states/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching state by ID.');
  }
};
