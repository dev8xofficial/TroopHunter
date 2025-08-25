import { CityQueueMessageKey, getCityQueueMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type ICityQueueAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { CityQueue } from '../../models';

// Create a new city
export const createCityQueue = async (req: Request, res: Response): Promise<Response> => {
  const { cityId, queueId, businessSourceId, status } = req.body as ICityQueueAttributes;
  try {
    const requestData: ICityQueueAttributes = { id: uuidv4(), cityId, queueId, businessSourceId, status };

    const newCityQueue = await CityQueue.create(requestData);

    logger.info(`City queue created successfully with ID ${newCityQueue.id}`);

    const response: ApiResponse<CityQueue> = createApiResponse({ success: true, data: newCityQueue, message: getCityQueueMessage(CityQueueMessageKey.CITYQUEUE_CREATED).message, status: getCityQueueMessage(CityQueueMessageKey.CITYQUEUE_CREATED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while creating city queue:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getCityQueueMessage(CityQueueMessageKey.FAILED_TO_CREATE_CITYQUEUE).message, status: getCityQueueMessage(CityQueueMessageKey.FAILED_TO_CREATE_CITYQUEUE).code });
    return res.json(response);
  }
};
