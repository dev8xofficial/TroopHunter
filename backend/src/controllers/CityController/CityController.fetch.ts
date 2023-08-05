import { Request, Response } from 'express';
import City from '../../models/City/City.model';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { createApiResponse } from '../../utils/response';
import { Op } from 'sequelize';
import { CityMessageKey, getCityMessage } from '../../models/City/City.messages';
import { RequestMessageKey, getRequestMessage } from '../../messages/Request.messages';

// Get cities by name and state
export const getCitiesByQuery = async (req: Request, res: Response) => {
  const { name, page, limit } = req.query;

  // Pagination
  if (!page || !limit) {
    const response: ApiResponse<null> = createApiResponse({ error: getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).message, status: getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).code });
    return res.json(response);
  }

  if (!name) {
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.MISSING_CITY).message, status: getCityMessage(CityMessageKey.MISSING_CITY).code });
    return res.json(response);
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    const response: ApiResponse<null> = createApiResponse({ error: getRequestMessage(RequestMessageKey.INVALID_REQUEST_LIMIT).message, status: getRequestMessage(RequestMessageKey.INVALID_REQUEST_LIMIT).code });
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
      const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.CITY_NOT_FOUND).message, status: getCityMessage(CityMessageKey.CITY_NOT_FOUND).code });
      return res.json(response);
    }

    const totalPages = Math.ceil(count / limitNumber);

    logger.info(`Successfully retrieved cities for city: ${name}`);
    const response: ApiResponse<{ totalRecords: number; totalPages: number; cities: City[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, cities }, message: getCityMessage(CityMessageKey.CITIES_RETRIEVED).message, status: getCityMessage(CityMessageKey.CITIES_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving cities:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.FAILED_TO_RETRIEVE_CITIES).message, status: getCityMessage(CityMessageKey.FAILED_TO_RETRIEVE_CITIES).code });
    res.json(response);
  }
};

// Get all cities
export const getCities = async (req: Request, res: Response) => {
  try {
    const cities = await City.findAll();
    logger.info('Successfully retrieved cities');
    const response: ApiResponse<City[]> = createApiResponse({ success: true, data: cities, message: getCityMessage(CityMessageKey.CITIES_RETRIEVED).message, status: getCityMessage(CityMessageKey.CITIES_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving cities:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.FAILED_TO_RETRIEVE_CITIES).message, status: getCityMessage(CityMessageKey.FAILED_TO_RETRIEVE_CITIES).code });
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
      const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.CITY_NOT_FOUND).message, status: getCityMessage(CityMessageKey.CITY_NOT_FOUND).code });
      return res.json(response);
    }
    logger.info(`Successfully retrieved city with ID ${id}`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: city, message: getCityMessage(CityMessageKey.CITY_RETRIEVED).message, status: getCityMessage(CityMessageKey.CITY_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.FAILED_TO_RETRIEVE_CITY).message, status: getCityMessage(CityMessageKey.FAILED_TO_RETRIEVE_CITY).code });
    res.json(response);
  }
};
