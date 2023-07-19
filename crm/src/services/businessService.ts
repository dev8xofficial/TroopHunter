import axios from 'axios';

const BASE_URL = process.env.BACKEND_URL;

export const getBusinessesBySearch = async (params: any, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/businesses/search`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching businesses.');
  }
};

export const getBusinesses = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/businesses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching businesses.');
  }
};

export const getBusinessById = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/businesses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while fetching business by ID.');
  }
};

export const createBusiness = async (data: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/businesses`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while creating a business.');
  }
};

export const updateBusiness = async (id: string, data: any, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/businesses/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    throw new Error('An error occurred while updating a business.');
  }
};

export const deleteBusiness = async (id: string, token: string) => {
  try {
    await axios.delete(`${BASE_URL}/businesses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('An error occurred while deleting a business.');
  }
};
