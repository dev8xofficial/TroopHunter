import axios from 'axios';
import { removeNullValues } from '../utils/helpers';

const BASE_URL = process.env.BACKEND_URL;

export const getBusinessesBySearchService = async (params: any, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/businesses/search`, { params: removeNullValues(params), headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching businesses.');
  }
};

export const getBusinessesService = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/businesses`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching businesses.');
  }
};

export const getBusinessByIdService = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/businesses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching business by ID.');
  }
};

export const createBusinessService = async (data: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/businesses`, removeNullValues(data), { headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while creating a business.');
  }
};

export const updateBusinessService = async (id: string, data: any, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/businesses/${id}`, removeNullValues(data), { headers: { Authorization: `Bearer ${token}` } });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while updating a business.');
  }
};

export const deleteBusinessService = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/businesses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while deleting a business.');
  }
};
