import { Request, Response } from 'express';
import Country from '../../models/Country';
import logger from '../../utils/logger';
import { ApiResponse } from '@repo/validator';
import { createApiResponse } from '@repo/validator';
import { CountryMessageKey, getCountryMessage } from '../../messages/Country';
import { v4 as uuidv4 } from 'uuid';
import { ICountryAttributes } from '@repo/validator';

// Create a new country
export const createCountry = async (req: Request, res: Response) => {
  const { name, code, phoneCode, currency, longitude, latitude }: ICountryAttributes = req.body;
  try {
    const requestData = { id: uuidv4(), name, code, phoneCode, currency, longitude, latitude };
    const newCountry = await Country.create(requestData);
    logger.info(`Country created successfully with ID ${newCountry.id}`);
    const response: ApiResponse<Country> = createApiResponse({ success: true, data: newCountry, message: getCountryMessage(CountryMessageKey.COUNTRY_CREATED).message, status: getCountryMessage(CountryMessageKey.COUNTRY_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating country:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.FAILED_TO_CREATE_COUNTRY).message, status: getCountryMessage(CountryMessageKey.FAILED_TO_CREATE_COUNTRY).code });
    res.json(response);
  }
};
