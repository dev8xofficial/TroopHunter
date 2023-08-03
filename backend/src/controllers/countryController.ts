import { Request, Response } from 'express';
import Country from '../models/Country/Country.model';
import logger from '../utils/logger';
import { ApiResponse } from '../types/Response.interface';
import { createApiResponse } from '../utils/response';
import { getMessage } from '../utils/message';
import { Op } from 'sequelize';
import { getCountryMessage } from '../models/Country/Country.messages';

// Get countries by name and country
export const getCountriesByQuery = async (req: Request, res: Response) => {
  const { name, page, limit } = req.query;

  // Pagination
  if (!page || !limit) {
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_PAGE_LIMIT').message, status: getMessage('MISSING_PAGE_LIMIT').code });
    return res.json(response);
  }

  if (!name) {
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('MISSING_COUNTRY').message, status: getCountryMessage('MISSING_COUNTRY').code });
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
    const { count, rows: countries } = await Country.findAndCountAll({
      where: whereClause,
      offset,
      limit: limitNumber,
    });

    if (countries.length === 0) {
      logger.warn(`No countries found for country: ${name}`);
      const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('COUNTRY_NOT_FOUND').message, status: getCountryMessage('COUNTRY_NOT_FOUND').code });
      return res.json(response);
    }

    const totalPages = Math.ceil(count / limitNumber);

    logger.info(`Successfully retrieved countries for country: ${name}`);
    const response: ApiResponse<{ totalRecords: number; totalPages: number; countries: Country[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, countries }, message: getCountryMessage('COUNTRIES_RETRIEVED').message, status: getCountryMessage('COUNTRIES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving countries:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('FAILED_TO_RETRIEVE_COUNTRIES').message, status: getCountryMessage('FAILED_TO_RETRIEVE_COUNTRIES').code });
    res.json(response);
  }
};

// Get all countries
export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await Country.findAll();
    logger.info('Successfully retrieved countries');
    const response: ApiResponse<Country[]> = createApiResponse({ success: true, data: countries, message: getCountryMessage('COUNTRIES_RETRIEVED').message, status: getCountryMessage('COUNTRIES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving countries:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('FAILED_TO_RETRIEVE_COUNTRIES').message, status: getCountryMessage('FAILED_TO_RETRIEVE_COUNTRIES').code });
    res.json(response);
  }
};

// Get a country by ID
export const getCountryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const country = await Country.findOne({ where: { id } });
    if (!country) {
      logger.warn(`Country with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('COUNTRY_NOT_FOUND').message, status: getCountryMessage('COUNTRY_NOT_FOUND').code });
      return res.json(response);
    }
    logger.info(`Successfully retrieved country with ID ${id}`);
    const response: ApiResponse<Country> = createApiResponse({ success: true, data: country, message: getCountryMessage('COUNTRY_RETRIEVED').message, status: getCountryMessage('COUNTRY_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving country with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('FAILED_TO_RETRIEVE_COUNTRY').message, status: getCountryMessage('FAILED_TO_RETRIEVE_COUNTRY').code });
    res.json(response);
  }
};

// Create a new country
export const createCountry = async (req: Request, res: Response) => {
  const { name, code, phoneCode, currency, longitude, latitude } = req.body;
  try {
    const newCountry = await Country.create({ name, code, phoneCode, currency, longitude, latitude });
    logger.info(`Country created successfully with ID ${newCountry.id}`);
    const response: ApiResponse<Country> = createApiResponse({ success: true, data: newCountry, message: getCountryMessage('COUNTRY_CREATED').message, status: getCountryMessage('COUNTRY_CREATED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating country:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('FAILED_TO_CREATE_COUNTRY').message, status: getCountryMessage('FAILED_TO_CREATE_COUNTRY').code });
    res.json(response);
  }
};

// Update a country by ID
export const updateCountry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, code, phoneCode, currency, longitude, latitude } = req.body;
  try {
    const existingCountry = await Country.findOne({ where: { id } });
    if (!existingCountry) {
      logger.warn(`Country with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('COUNTRY_NOT_FOUND').message, status: getCountryMessage('COUNTRY_NOT_FOUND').code });
      return res.json(response);
    }
    await existingCountry.update({ name, code, phoneCode, currency, longitude, latitude });
    logger.info(`Country with ID ${id} updated successfully`);
    const response: ApiResponse<Country> = createApiResponse({ success: true, data: existingCountry, message: getCountryMessage('COUNTRY_UPDATED').message, status: getCountryMessage('COUNTRY_UPDATED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating country with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('FAILED_TO_UPDATE_COUNTRY').message, status: getCountryMessage('FAILED_TO_UPDATE_COUNTRY').code });
    res.json(response);
  }
};

// Delete a country by ID
export const deleteCountry = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingCountry = await Country.findOne({ where: { id } });
    if (!existingCountry) {
      logger.warn(`Country with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('COUNTRY_NOT_FOUND').message, status: getCountryMessage('COUNTRY_NOT_FOUND').code });
      return res.json(response);
    }
    await existingCountry.destroy();
    logger.info(`Country with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getCountryMessage('COUNTRY_DELETED').message, status: getCountryMessage('COUNTRY_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting country with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage('FAILED_TO_DELETE_COUNTRY').message, status: getCountryMessage('FAILED_TO_DELETE_COUNTRY').code });
    res.json(response);
  }
};
