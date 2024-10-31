import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Sequelize from '../../config/database';
import Queue from '../../models/Queue';
import logger from '../../utils/logger';
import { ApiResponse } from 'validator/interfaces';
import { createApiResponse } from 'validator/utils';
import { QueueMessageKey, getQueueMessage } from '../../messages/Queue';

export const getQueues = async (req: Request, res: Response) => {
  const { page, limit, cityId, businessSourceId } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;

  // Where clause
  const whereClause: { [key: string]: any } = {};

  if (cityId && businessSourceId && typeof cityId === 'string' && typeof businessSourceId === 'string') {
    whereClause.id = {
      [Op.notIn]: Sequelize.literal(
        `(SELECT "queueId" FROM "CityQueues" WHERE "cityId" = '${cityId}' AND "businessSourceId" = '${businessSourceId}')`
      ),
    };
  }

  try {
    const { count, rows: queues } = await Queue.findAndCountAll({
      where: whereClause,
      offset,
      limit: limitNumber,
      order: [['searchQuery', 'ASC']],
    });

    const totalPages = Math.ceil(count / limitNumber);

    logger.info(getQueueMessage(QueueMessageKey.QUEUES_RETRIEVED).message);
    const response: ApiResponse<{ totalRecords: number; totalPages: number; queues: Queue[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, queues }, message: getQueueMessage(QueueMessageKey.QUEUES_RETRIEVED).message, status: getQueueMessage(QueueMessageKey.QUEUES_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving queues:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.FAILED_TO_RETRIEVE_QUEUES).message, status: getQueueMessage(QueueMessageKey.FAILED_TO_RETRIEVE_QUEUES).code });
    res.json(response);
  }
};

export const getQueueById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const queue = await Queue.findOne({ where: { id } });

    if (!queue) {
      logger.warn(`Queue with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.QUEUE_NOT_FOUND).message, status: getQueueMessage(QueueMessageKey.QUEUE_NOT_FOUND).code });
      return res.json(response);
    }

    const response: ApiResponse<Queue> = createApiResponse({ success: true, data: queue, message: getQueueMessage(QueueMessageKey.QUEUE_UPDATED).message, status: getQueueMessage(QueueMessageKey.QUEUE_UPDATED).code });
    logger.info(getQueueMessage(QueueMessageKey.QUEUE_UPDATED).message);
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving queue with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.FAILED_TO_RETRIEVE_QUEUE).message, status: getQueueMessage(QueueMessageKey.FAILED_TO_RETRIEVE_QUEUE).code });
    res.json(response);
  }
};
