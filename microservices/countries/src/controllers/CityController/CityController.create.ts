import { CityMessageKey, getCityMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, type ICityAttributes, createApiResponse } from '@repo/validator';
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { City } from '../../models';

// Create a new city
export const createCity = async (req: Request, res: Response): Promise<Response> => {
  const { name, state, stateCode, country, countryCode, longitude, latitude } = req.body as ICityAttributes;
  try {
    const requestData: ICityAttributes = { id: uuidv4(), name, state, stateCode, country, countryCode, longitude, latitude };
    const newCity = await City.create(requestData);
    logger.info(`City created successfully with ID ${newCity.id}`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: newCity, message: getCityMessage(CityMessageKey.CITY_CREATED).message, status: getCityMessage(CityMessageKey.CITY_CREATED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while creating city:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.FAILED_TO_CREATE_CITY).message, status: getCityMessage(CityMessageKey.FAILED_TO_CREATE_CITY).code });
    return res.json(response);
  }
};
