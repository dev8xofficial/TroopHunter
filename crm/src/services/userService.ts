import axios from 'axios';

const BASE_URL = process.env.BACKEND_URL;

export const getUsers = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching users.');
  }
};

export const getUserWithInclude = async (id: string, token: string, params: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}/include`, { params, headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching user by ID.');
  }
};

export const getUserById = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching user by ID.');
  }
};

export const createUser = async (data: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, data, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while creating a user.');
  }
};

export const updateUser = async (id: string, data: any, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while updating a user.');
  }
};

export const deleteUser = async (id: string, token: string) => {
  try {
    await axios.delete(`${BASE_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw new Error('An error occurred while deleting a user.');
  }
};
