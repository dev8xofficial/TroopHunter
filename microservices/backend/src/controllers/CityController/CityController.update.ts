import { Request, Response } from 'express';
import City from '../../models/City';
import logger from '../../utils/logger';
import { ApiResponse } from '@repo/validator';
import { createApiResponse } from '@repo/validator';
import { CityMessageKey, getCityMessage } from '../../messages/City';
import { ICityAttributes } from '@repo/validator';

// Update a city by ID
export const updateCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, stateCode, countryCode, longitude, latitude }: ICityAttributes = req.body;
  try {
    const existingCity = await City.findOne({ where: { id } });
    if (!existingCity) {
      logger.warn(`City with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.CITY_NOT_FOUND).message, status: getCityMessage(CityMessageKey.CITY_NOT_FOUND).code });
      return res.json(response);
    }
    await existingCity.update({ name, stateCode, countryCode, longitude, latitude });
    logger.info(`City with ID ${id} updated successfully`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: existingCity, message: getCityMessage(CityMessageKey.CITY_UPDATED).message, status: getCityMessage(CityMessageKey.CITY_UPDATED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.FAILED_TO_UPDATE_CITY).message, status: getCityMessage(CityMessageKey.FAILED_TO_UPDATE_CITY).code });
    res.json(response);
  }
};
