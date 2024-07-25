import { Request, Response } from 'express';
import CityQueue from '../../models/CityQueue';
import logger from '../../utils/logger';
import { ApiResponse, ICityQueueAttributes } from 'validator/interfaces';
import { createApiResponse } from 'validator/utils';
import { CityQueueMessageKey, getCityQueueMessage } from '../../messages/CityQueue';
import { v4 as uuidv4 } from 'uuid';

// Create a new city
export const createCityQueue = async (req: Request, res: Response) => {
  const { cityId, queueId, status }: ICityQueueAttributes = req.body;
  try {
    const requestData: ICityQueueAttributes = { id: uuidv4(), cityId, queueId, status };

    const newCityQueue = await CityQueue.create(requestData);

    logger.info(`City queue created successfully with ID ${newCityQueue.id}`);
    
    const response: ApiResponse<CityQueue> = createApiResponse({ success: true, data: newCityQueue, message: getCityQueueMessage(CityQueueMessageKey.CITYQUEUE_CREATED).message, status: getCityQueueMessage(CityQueueMessageKey.CITYQUEUE_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating city:', error);
    
    const response: ApiResponse<null> = createApiResponse({ error: getCityQueueMessage(CityQueueMessageKey.FAILED_TO_CREATE_CITYQUEUE).message, status: getCityQueueMessage(CityQueueMessageKey.FAILED_TO_CREATE_CITYQUEUE).code });
    res.json(response);
  }
};