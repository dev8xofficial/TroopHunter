import { Request, Response } from 'express';
import City from '../models/City/City.model';
import logger from '../utils/logger';
import { ApiResponse } from '../types/Response.interface';
import { createApiResponse } from '../utils/response';
import { getMessage } from '../utils/message';
import { Op } from 'sequelize';
import { getCityMessage } from '../models/City/City.messages';

// Get cities by name and state
export const getCitiesByQuery = async (req: Request, res: Response) => {
  const { name, page, limit } = req.query;

  // Pagination
  if (!page || !limit) {
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_PAGE_LIMIT').message, status: getMessage('MISSING_PAGE_LIMIT').code });
    return res.json(response);
  }

  if (!name) {
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('MISSING_CITY').message, status: getCityMessage('MISSING_CITY').code });
    return res.json(response);
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('INVALID_PAGE_LIMIT').message, status: getMessage('INVALID_PAGE_LIMIT').code });
    return res.json(response);
  }

  const offset = (pageNumber - 1) * limitNumber;

  // Where clause
  const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  try {
    const { count, rows: cities } = await City.findAndCountAll({
      where: whereClause,
      offset,
      limit: limitNumber,
    });

    if (cities.length === 0) {
      logger.warn(`No cities found for city: ${name}`);
      const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('CITY_NOT_FOUND').message, status: getCityMessage('CITY_NOT_FOUND').code });
      return res.json(response);
    }

    const totalPages = Math.ceil(count / limitNumber);

    logger.info(`Successfully retrieved cities for city: ${name}`);
    const response: ApiResponse<{ totalRecords: number; totalPages: number; cities: City[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, cities }, message: getCityMessage('CITIES_RETRIEVED').message, status: getCityMessage('CITIES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving cities:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('FAILED_TO_RETRIEVE_CITIES').message, status: getCityMessage('FAILED_TO_RETRIEVE_CITIES').code });
    res.json(response);
  }
};

// Get all cities
export const getCities = async (req: Request, res: Response) => {
  try {
    const cities = await City.findAll();
    logger.info('Successfully retrieved cities');
    const response: ApiResponse<City[]> = createApiResponse({ success: true, data: cities, message: getCityMessage('CITIES_RETRIEVED').message, status: getCityMessage('CITIES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving cities:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('FAILED_TO_RETRIEVE_CITIES').message, status: getCityMessage('FAILED_TO_RETRIEVE_CITIES').code });
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
      const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('CITY_NOT_FOUND').message, status: getCityMessage('CITY_NOT_FOUND').code });
      return res.json(response);
    }
    logger.info(`Successfully retrieved city with ID ${id}`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: city, message: getCityMessage('CITY_RETRIEVED').message, status: getCityMessage('CITY_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('FAILED_TO_RETRIEVE_CITY').message, status: getCityMessage('FAILED_TO_RETRIEVE_CITY').code });
    res.json(response);
  }
};

// Create a new city
export const createCity = async (req: Request, res: Response) => {
  const { name, stateCode, countryCode, longitude, latitude } = req.body;
  try {
    const newCity = await City.create({ name, stateCode, countryCode, longitude, latitude });
    logger.info(`City created successfully with ID ${newCity.id}`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: newCity, message: getCityMessage('CITY_CREATED').message, status: getCityMessage('CITY_CREATED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating city:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('FAILED_TO_CREATE_CITY').message, status: getCityMessage('FAILED_TO_CREATE_CITY').code });
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
      const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('CITY_NOT_FOUND').message, status: getCityMessage('CITY_NOT_FOUND').code });
      return res.json(response);
    }
    await existingCity.update({ name, stateCode, countryCode, longitude, latitude });
    logger.info(`City with ID ${id} updated successfully`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: existingCity, message: getCityMessage('CITY_UPDATED').message, status: getCityMessage('CITY_UPDATED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('FAILED_TO_UPDATE_CITY').message, status: getCityMessage('FAILED_TO_UPDATE_CITY').code });
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
      const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('CITY_NOT_FOUND').message, status: getCityMessage('CITY_NOT_FOUND').code });
      return res.json(response);
    }
    await city.destroy();
    logger.info(`City with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getCityMessage('CITY_DELETED').message, status: getCityMessage('CITY_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage('FAILED_TO_DELETE_CITY').message, status: getCityMessage('FAILED_TO_DELETE_CITY').code });
    res.json(response);
  }
};
