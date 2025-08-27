import { CountryMessageKey, getCountryMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, type ICountryAttributes, createApiResponse } from '@repo/validator';
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Country } from '../../models';

// Create a new country
export const createCountry = async (req: Request, res: Response): Promise<Response> => {
  const { name, code, phoneCode, currency, longitude, latitude } = req.body as ICountryAttributes;
  try {
    const requestData = { id: uuidv4(), name, code, phoneCode, currency, longitude, latitude };
    const newCountry = await Country.create(requestData);
    logger.info(`Country created successfully with ID ${newCountry.id}`);
    const response: ApiResponse<Country> = createApiResponse({ success: true, data: newCountry, message: getCountryMessage(CountryMessageKey.COUNTRY_CREATED).message, status: getCountryMessage(CountryMessageKey.COUNTRY_CREATED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while creating country:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.FAILED_TO_CREATE_COUNTRY).message, status: getCountryMessage(CountryMessageKey.FAILED_TO_CREATE_COUNTRY).code });
    return res.json(response);
  }
};
