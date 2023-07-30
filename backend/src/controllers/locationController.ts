import { Request, Response } from 'express';
import Location from '../models/Location';
import logger from '../utils/logger';
import { ApiResponse } from '../types/response';
import { createApiResponse } from '../utils/response';
import { getMessage } from '../utils/message';

// Get a location by city, state, and country
export const getLocationsByQuery = async (req: Request, res: Response) => {
  const { city, state, country } = req.query;

  try {
    if (!city || !state || !country) {
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_CITY_STATE_COUNTRY').message, status: getMessage('MISSING_CITY_STATE_COUNTRY').code });
      return res.json(response);
    }

    const locations = await Location.findAll({
      where: {
        city: city as string,
        state: state as string,
        country: country as string,
      },
    });

    if (locations.length === 0) {
      logger.warn(`No locations found for city: ${city}, state: ${state}, country: ${country}`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LOCATION_NOT_FOUND').message, status: getMessage('LOCATION_NOT_FOUND').code });
      return res.json(response);
    }

    logger.info(`Successfully retrieved locations for city: ${city}, state: ${state}, country: ${country}`);
    const response: ApiResponse<Location[]> = createApiResponse({ success: true, data: locations, message: getMessage('LOCATIONS_RETRIEVED').message, status: getMessage('LOCATIONS_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving locations:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LOCATIONS').message, status: getMessage('FAILED_TO_RETRIEVE_LOCATIONS').code });
    res.json(response);
  }
};

// Get all locations
export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.findAll();
    logger.info('Successfully retrieved locations');
    const response: ApiResponse<Location[]> = createApiResponse({ success: true, data: locations, message: getMessage('LOCATIONS_RETRIEVED').message, status: getMessage('LOCATIONS_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving locations:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LOCATIONS').message, status: getMessage('FAILED_TO_RETRIEVE_LOCATIONS').code });
    res.json(response);
  }
};

// Get a location by ID
export const getLocationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const location = await Location.findOne({ where: { id } });
    if (!location) {
      logger.warn(`Location with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LOCATION_NOT_FOUND').message, status: getMessage('LOCATION_NOT_FOUND').code });
      return res.json(response);
    }
    logger.info(`Successfully retrieved location with ID ${id}`);
    const response: ApiResponse<Location> = createApiResponse({ success: true, data: location, message: getMessage('LOCATIONS_RETRIEVED').message, status: getMessage('LOCATIONS_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving location with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LOCATIONS').message, status: getMessage('FAILED_TO_RETRIEVE_LOCATIONS').code });
    res.json(response);
  }
};

// Create a new location
export const createLocation = async (req: Request, res: Response) => {
  const { city, state, country, importance } = req.body;
  try {
    const location = await Location.create({ city, state, country, importance });
    logger.info(`Location created successfully with ID ${location.id}`);
    const response: ApiResponse<Location> = createApiResponse({ success: true, data: location, message: getMessage('LOCATION_CREATED').message, status: getMessage('LOCATION_CREATED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating location:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_CREATE_LOCATION').message, status: getMessage('FAILED_TO_CREATE_LOCATION').code });
    res.json(response);
  }
};

// Update a location by ID
export const updateLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { city, state, country } = req.body;
  try {
    const location = await Location.findOne({ where: { id } });
    if (!location) {
      logger.warn(`Location with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LOCATION_NOT_FOUND').message, status: getMessage('LOCATION_NOT_FOUND').code });
      return res.json(response);
    }
    await location.update({ city, state, country });
    logger.info(`Location with ID ${id} updated successfully`);
    const response: ApiResponse<Location> = createApiResponse({ success: true, data: location, message: getMessage('LOCATION_UPDATED').message, status: getMessage('LOCATION_UPDATED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating location with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_UPDATE_LOCATION').message, status: getMessage('FAILED_TO_UPDATE_LOCATION').code });
    res.json(response);
  }
};

// Delete a location by ID
export const deleteLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const location = await Location.findOne({ where: { id } });
    if (!location) {
      logger.warn(`Location with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LOCATION_NOT_FOUND').message, status: getMessage('LOCATION_NOT_FOUND').code });
      return res.json(response);
    }
    await location.destroy();
    logger.info(`Location with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getMessage('LOCATION_DELETED').message, status: getMessage('LOCATION_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting location with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_DELETE_LOCATION').message, status: getMessage('FAILED_TO_DELETE_LOCATION').code });
    res.json(response);
  }
};
