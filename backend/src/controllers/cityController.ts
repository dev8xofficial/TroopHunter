import { Request, Response } from 'express';
import City from '../models/City';
import logger from '../utils/logger';
import { ApiResponse } from '../types/response';
import { createApiResponse } from '../utils/response';
import { getMessage } from '../utils/message';

// Get cities by name and state
export const getCitiesByQuery = async (req: Request, res: Response) => {
  const { name } = req.query;

  try {
    if (!name) {
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_CITY').message, status: getMessage('MISSING_CITY').code });
      return res.json(response);
    }

    const cities = await City.findAll({
      where: {
        name: name as string,
      },
    });

    if (cities.length === 0) {
      logger.warn(`No cities found for city: ${name}`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('CITY_NOT_FOUND').message, status: getMessage('CITY_NOT_FOUND').code });
      return res.json(response);
    }

    logger.info(`Successfully retrieved cities for city: ${name}`);
    const response: ApiResponse<City[]> = createApiResponse({ success: true, data: cities, message: getMessage('CITIES_RETRIEVED').message, status: getMessage('CITIES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving cities:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_CITIES').message, status: getMessage('FAILED_TO_RETRIEVE_CITIES').code });
    res.json(response);
  }
};

// Get all cities
export const getCities = async (req: Request, res: Response) => {
  try {
    const cities = await City.findAll();
    logger.info('Successfully retrieved cities');
    const response: ApiResponse<City[]> = createApiResponse({ success: true, data: cities, message: getMessage('CITIES_RETRIEVED').message, status: getMessage('CITIES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving cities:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_CITIES').message, status: getMessage('FAILED_TO_RETRIEVE_CITIES').code });
    res.json(response);
  }
};

// Get a city by ID
export const getCityById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const city = await City.findOne({ where: { id } });
    if (!city) {
      logger.warn(`City with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('CITY_NOT_FOUND').message, status: getMessage('CITY_NOT_FOUND').code });
      return res.json(response);
    }
    logger.info(`Successfully retrieved city with ID ${id}`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: city, message: getMessage('CITY_RETRIEVED').message, status: getMessage('CITY_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_CITY').message, status: getMessage('FAILED_TO_RETRIEVE_CITY').code });
    res.json(response);
  }
};

// Create a new city
export const createCity = async (req: Request, res: Response) => {
  const { name, stateCode, countryCode, longitude, latitude } = req.body;
  try {
    const newCity = await City.create({ name, stateCode, countryCode, longitude, latitude });
    logger.info(`City created successfully with ID ${newCity.id}`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: newCity, message: getMessage('CITY_CREATED').message, status: getMessage('CITY_CREATED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating city:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_CREATE_CITY').message, status: getMessage('FAILED_TO_CREATE_CITY').code });
    res.json(response);
  }
};

// Update a city by ID
export const updateCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, stateCode, countryCode, longitude, latitude } = req.body;
  try {
    const existingCity = await City.findOne({ where: { id } });
    if (!existingCity) {
      logger.warn(`City with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('CITY_NOT_FOUND').message, status: getMessage('CITY_NOT_FOUND').code });
      return res.json(response);
    }
    await existingCity.update({ name, stateCode, countryCode, longitude, latitude });
    logger.info(`City with ID ${id} updated successfully`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: existingCity, message: getMessage('CITY_UPDATED').message, status: getMessage('CITY_UPDATED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_UPDATE_CITY').message, status: getMessage('FAILED_TO_UPDATE_CITY').code });
    res.json(response);
  }
};

// Delete a city by ID
export const deleteCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const city = await City.findOne({ where: { id } });
    if (!city) {
      logger.warn(`City with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('CITY_NOT_FOUND').message, status: getMessage('CITY_NOT_FOUND').code });
      return res.json(response);
    }
    await city.destroy();
    logger.info(`City with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getMessage('CITY_DELETED').message, status: getMessage('CITY_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_DELETE_CITY').message, status: getMessage('FAILED_TO_DELETE_CITY').code });
    res.json(response);
  }
};
