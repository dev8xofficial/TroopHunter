import { CountryMessageKey, getCountryMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type ICountryFetchByIdRequestAttributes, type ICountryFetchRequestAttributes, type IPaginationAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';
import { type ParsedQs } from 'qs';
import { Op } from 'sequelize';

import { Country } from '../../models';

// Get countries by name and country
export const getCountriesByQuery = async (req: Request, res: Response): Promise<Response> => {
  const { name, code } = req.query as ICountryFetchRequestAttributes;
  const { page, limit } = req.query as ParsedQs & IPaginationAttributes;

  // Pagination
  const pageNumber = parseInt(String(page)) ?? 1;
  const limitNumber = parseInt(String(limit)) ?? 10;

  const offset = (pageNumber - 1) * limitNumber;

  // Where clause
  const whereClause: Record<string, unknown> = {};

  if (name != null) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (code != null) {
    whereClause.code = { [Op.iLike]: `%${code}%` };
  }

  try {
    const { count, rows: countries } = await Country.findAndCountAll({
      where: whereClause,
      offset,
      limit: limitNumber,
    });

    if (countries.length === 0) {
      logger.warn(`No countries found for country: ${name ?? ''}`);
      const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).message, status: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).code });
      return res.json(response);
    }

    const totalPages = Math.ceil(count / limitNumber);

    logger.info('Successfully retrieved countries.');
    const response: ApiResponse<{ totalRecords: number; totalPages: number; countries: Country[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, countries }, message: getCountryMessage(CountryMessageKey.COUNTRIES_RETRIEVED).message, status: getCountryMessage(CountryMessageKey.COUNTRIES_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while retrieving countries:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.FAILED_TO_RETRIEVE_COUNTRIES).message, status: getCountryMessage(CountryMessageKey.FAILED_TO_RETRIEVE_COUNTRIES).code });
    return res.json(response);
  }
};

// Get all countries
export const getCountries = async (req: Request, res: Response): Promise<Response> => {
  const { page, limit } = req.query as ParsedQs & IPaginationAttributes;

  const pageNumber = parseInt(String(page)) ?? 1;
  const limitNumber = parseInt(String(limit)) ?? 10;

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: countries } = await Country.findAndCountAll({
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    logger.info('Successfully retrieved countries');
    const response: ApiResponse<{ totalRecords: number; totalPages: number; countries: Country[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, countries }, message: getCountryMessage(CountryMessageKey.COUNTRIES_RETRIEVED).message, status: getCountryMessage(CountryMessageKey.COUNTRIES_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while retrieving countries:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.FAILED_TO_RETRIEVE_COUNTRIES).message, status: getCountryMessage(CountryMessageKey.FAILED_TO_RETRIEVE_COUNTRIES).code });
    return res.json(response);
  }
};

// Get a country by ID
export const getCountryById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as ICountryFetchByIdRequestAttributes;
  try {
    const country = await Country.findOne({ where: { id } });
    if (country == null) {
      logger.warn(`Country with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).message, status: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).code });
      return res.json(response);
    }
    logger.info(`Successfully retrieved country with ID ${id}`);
    const response: ApiResponse<Country> = createApiResponse({ success: true, data: country, message: getCountryMessage(CountryMessageKey.COUNTRY_RETRIEVED).message, status: getCountryMessage(CountryMessageKey.COUNTRY_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving country with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.FAILED_TO_RETRIEVE_COUNTRY).message, status: getCountryMessage(CountryMessageKey.FAILED_TO_RETRIEVE_COUNTRY).code });
    return res.json(response);
  }
};
