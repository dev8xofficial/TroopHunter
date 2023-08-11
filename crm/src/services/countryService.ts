import axios from 'axios';
import { removeNullValues } from '../utils/helpers';

const BASE_URL = process.env.BACKEND_URL;

export const getCountriesByQuery = async (params: any, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/countries/search`, { params: removeNullValues(params), headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching countries.');
  }
};

export const getCountryByIdService = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/countries/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching country by ID.');
  }
};
