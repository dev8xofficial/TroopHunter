import axios from 'axios';

import { removeEmptyStringValues } from '../utils/helpers';

const BASE_URL = process.env.BACKEND_URL;

export const getBusinessPhonesByQuery = async (params: any, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/business-phones/search`, { params: removeEmptyStringValues(params), headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching phones.');
  }
};

export const getBusinessPhoneByIdService = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/business-phones/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching phone by ID.');
  }
};
