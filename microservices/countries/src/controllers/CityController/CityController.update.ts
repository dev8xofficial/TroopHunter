import { CityMessageKey, getCityMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type ICityAttributes, type ICityFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { City } from '../../models';

// Update a city by ID
export const updateCity = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as ICityFetchByIdRequestAttributes;
  const { name, stateCode, countryCode, longitude, latitude } = req.body as ICityAttributes;
  try {
    const existingCity = await City.findOne({ where: { id } });
    if (existingCity == null) {
      logger.warn(`City with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.CITY_NOT_FOUND).message, status: getCityMessage(CityMessageKey.CITY_NOT_FOUND).code });
      return res.json(response);
    }
    await existingCity.update({ name, stateCode, countryCode, longitude, latitude });
    logger.info(`City with ID ${id} updated successfully`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: existingCity, message: getCityMessage(CityMessageKey.CITY_UPDATED).message, status: getCityMessage(CityMessageKey.CITY_UPDATED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while updating city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.FAILED_TO_UPDATE_CITY).message, status: getCityMessage(CityMessageKey.FAILED_TO_UPDATE_CITY).code });
    return res.json(response);
  }
};
