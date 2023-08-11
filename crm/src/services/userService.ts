import axios from 'axios';
import { removeNullValues } from '../utils/helpers';

const BASE_URL = process.env.BACKEND_URL;

export const getUsersService = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching users.');
  }
};

export const getUserWithIncludeService = async (id: string, token: string, params: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}/include`, { params: removeNullValues(params), headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching user by ID.');
  }
};

export const getUserByIdService = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching user by ID.');
  }
};

export const createUserService = async (data: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, removeNullValues(data), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while creating a user.');
  }
};

export const updateUserService = async (id: string, data: any, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, removeNullValues(data), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while updating a user.');
  }
};

export const deleteUserService = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while deleting a user.');
  }
};
