import { Request, Response } from 'express';
import City from '../../models/City';
import logger from '../../utils/logger';
import { ApiResponse } from 'validator/interfaces';
import { createApiResponse } from 'validator/utils';
import { CityMessageKey, getCityMessage } from '../../messages/City';

// Delete a city by ID
export const deleteCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const city = await City.findOne({ where: { id } });
    if (!city) {
      logger.warn(`City with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.CITY_NOT_FOUND).message, status: getCityMessage(CityMessageKey.CITY_NOT_FOUND).code });
      return res.json(response);
    }
    await city.destroy();
    logger.info(`City with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getCityMessage(CityMessageKey.CITY_DELETED).message, status: getCityMessage(CityMessageKey.CITY_DELETED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.FAILED_TO_DELETE_CITY).message, status: getCityMessage(CityMessageKey.FAILED_TO_DELETE_CITY).code });
    res.json(response);
  }
};
