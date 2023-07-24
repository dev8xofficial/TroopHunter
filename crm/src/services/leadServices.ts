import axios from 'axios';

const BASE_URL = process.env.BACKEND_URL;

export const getLeadsBySearchService = async (params: any, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/leads/search`, { params, headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching leads.');
  }
};

export const getLeadsService = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/leads`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching leads.');
  }
};

export const getLeadByIdService = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/leads/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching lead by ID.');
  }
};

export const createLeadService = async (data: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/leads`, data, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while creating a lead.');
  }
};

export const updateLeadService = async (id: string, data: any, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/leads/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while updating a lead.');
  }
};

export const deleteLeadService = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/leads/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while deleting a lead.');
  }
};

export const deleteLeadsService = async (data: any, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/leads/bulk`, { data, headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while deleting a lead.');
  }
};
