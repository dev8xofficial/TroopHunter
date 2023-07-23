import axios from 'axios';

const BASE_URL = process.env.BACKEND_URL;

export const loginService = async (userData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, userData);
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while logging in.');
  }
};

export const registerService = async (userData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while registering.');
  }
};
