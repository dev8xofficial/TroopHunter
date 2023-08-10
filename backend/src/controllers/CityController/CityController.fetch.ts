import { Request, Response } from 'express';
import City from '../../models/City';
import logger from '../../utils/logger';
import { ApiResponse } from 'validator/interfaces/Response';
import { createApiResponse } from 'validator/utils/response';
import { Op } from 'sequelize';
import { CityMessageKey, getCityMessage } from '../../messages/City';
import { PaginationMessageKey, getPaginationMessage } from '../../messages/Pagination';

// Get cities by name and state
export const getCitiesByQuery = async (req: Request, res: Response) => {
  const { name, stateCode, countryCode, page, limit } = req.query;

  // Pagination
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;

  // Where clause
  const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (stateCode) {
    whereClause.stateCode = { [Op.iLike]: `%${stateCode}%` };
  }

  if (countryCode) {
    whereClause.countryCode = { [Op.iLike]: `%${countryCode}%` };
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
  const { page, limit } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: cities } = await City.findAndCountAll({
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    logger.info('Successfully retrieved cities');
    const response: ApiResponse<{ totalRecords: number; totalPages: number; cities: City[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, cities }, message: getCityMessage(CityMessageKey.CITIES_RETRIEVED).message, status: getCityMessage(CityMessageKey.CITIES_RETRIEVED).code });
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
