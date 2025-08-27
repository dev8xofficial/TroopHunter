import { CityMessageKey, getCityMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type ICityFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { City } from '../../models';

// Delete a city by ID
export const deleteCity = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as ICityFetchByIdRequestAttributes;
  try {
    const city = await City.findOne({ where: { id } });
    if (city == null) {
      logger.warn(`City with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.CITY_NOT_FOUND).message, status: getCityMessage(CityMessageKey.CITY_NOT_FOUND).code });
      return res.json(response);
    }
    await city.destroy();
    logger.info(`City with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getCityMessage(CityMessageKey.CITY_DELETED).message, status: getCityMessage(CityMessageKey.CITY_DELETED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while deleting city with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.FAILED_TO_DELETE_CITY).message, status: getCityMessage(CityMessageKey.FAILED_TO_DELETE_CITY).code });
    return res.json(response);
  }
};
