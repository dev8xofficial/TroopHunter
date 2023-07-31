import axios from 'axios';

const BASE_URL = process.env.BACKEND_URL;

export const getCitiesByQuery = async (params: any, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/cities/search`, { params, headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching cities.');
  }
};

export const getCityByIdService = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/cities/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching city by ID.');
  }
};
