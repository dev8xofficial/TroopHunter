import { Request, Response } from 'express';
import City from '../../models/City/City.model';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { ICityResponseAttributes } from '../../models/City/City.interface';
import { createApiResponse } from '../../utils/response';
import { CityMessageKey, getCityMessage } from '../../models/City/City.messages';
import { v4 as uuidv4 } from 'uuid';

// Create a new city
export const createCity = async (req: Request, res: Response) => {
  const { name, stateCode, countryCode, longitude, latitude } = req.body;
  try {
    const requestData: ICityResponseAttributes = { id: uuidv4(), name, stateCode, countryCode, longitude, latitude };
    const newCity = await City.create(requestData);
    logger.info(`City created successfully with ID ${newCity.id}`);
    const response: ApiResponse<City> = createApiResponse({ success: true, data: newCity, message: getCityMessage(CityMessageKey.CITY_CREATED).message, status: getCityMessage(CityMessageKey.CITY_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating city:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getCityMessage(CityMessageKey.FAILED_TO_CREATE_CITY).message, status: getCityMessage(CityMessageKey.FAILED_TO_CREATE_CITY).code });
    res.json(response);
  }
};
