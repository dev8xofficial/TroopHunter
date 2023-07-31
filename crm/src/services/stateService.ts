import axios from 'axios';

const BASE_URL = process.env.BACKEND_URL;

export const getStatesByQuery = async (params: any, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/states/search`, { params, headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching states.');
  }
};

export const getStateByIdService = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/states/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching state by ID.');
  }
};
