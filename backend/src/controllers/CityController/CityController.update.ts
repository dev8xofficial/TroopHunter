import { Request, Response } from 'express';
import City from '../../models/City/City.model';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { createApiResponse } from '../../utils/response';
import { CityMessageKey, getCityMessage } from '../../models/City/City.messages';
import { ICityRequestAttributes } from '../../models/City/City.interface';

// Update a city by ID
export const updateCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, stateCode, countryCode, longitude, latitude }: ICityRequestAttributes = req.body;
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
