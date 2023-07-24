import axios from 'axios';

const BASE_URL = process.env.BACKEND_URL;

// Get locations by search query
export const getLocationsBySearchService = async (params: any, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/locations/search`, { params, headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching locations by search.');
  }
};

// Get a location by ID
export const getLocationByIdService = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/locations/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching location by ID.');
  }
};

// Create a new location
export const createLocationService = async (locationData: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/locations`, locationData, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while creating a location.');
  }
};

// Update a location by ID
export const updateLocationService = async (id: string, locationData: any, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/locations/${id}`, locationData, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while updating location by ID.');
  }
};

// Delete a location by ID
export const deleteLocationService = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/locations/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while deleting location by ID.');
  }
};
