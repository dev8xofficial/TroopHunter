import { Request, Response } from 'express';
import City from '../../models/City';
import logger from '../../utils/logger';
import { ApiResponse } from 'validator/interfaces/Response';
import { ICityRequestAttributes, ICityResponseAttributes } from 'validator/interfaces/City';
import { createApiResponse } from 'validator/utils/response';
import { CityMessageKey, getCityMessage } from '../../messages/City';
import { v4 as uuidv4 } from 'uuid';

// Create a new city
export const createCity = async (req: Request, res: Response) => {
  const { name, state, stateCode, country, countryCode, longitude, latitude }: ICityRequestAttributes = req.body;
  try {
    const requestData: ICityResponseAttributes = { id: uuidv4(), name, state, stateCode, country, countryCode, longitude, latitude };
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
