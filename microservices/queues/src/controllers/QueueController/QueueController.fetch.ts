import { QueueMessageKey, getQueueMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type ICityQueueFetchRequestSchemaAttributes, type IPaginationAttributes, type IQueueFetchByIdRequestSchemaAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';
import { type ParsedQs } from 'qs';
import { Op } from 'sequelize';

import sequelize from '../../config/database';
import { Queue } from '../../models';

export const getQueues = async (req: Request, res: Response): Promise<Response> => {
  const { cityId, businessSourceId } = req.query as ICityQueueFetchRequestSchemaAttributes;
  const { page, limit } = req.query as ParsedQs & IPaginationAttributes;

  const pageNumber = parseInt(String(page)) ?? 1;
  const limitNumber = parseInt(String(limit)) ?? 10;

  const offset = (pageNumber - 1) * limitNumber;

  // Where clause
  const whereClause: Record<string, unknown> = {};

  if (cityId != null && businessSourceId != null && typeof cityId === 'string' && typeof businessSourceId === 'string') {
    whereClause.id = {
      [Op.notIn]: sequelize.literal(`(SELECT "queueId" FROM "CityQueues" WHERE "cityId" = '${cityId}' AND "businessSourceId" = '${businessSourceId}')`),
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
    return res.json(response);
  } catch (error) {
    logger.error('Error while retrieving queues:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.FAILED_TO_RETRIEVE_QUEUES).message, status: getQueueMessage(QueueMessageKey.FAILED_TO_RETRIEVE_QUEUES).code });
    return res.json(response);
  }
};

export const getQueueById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IQueueFetchByIdRequestSchemaAttributes;

  try {
    const queue = await Queue.findOne({ where: { id } });

    if (queue == null) {
      logger.warn(`Queue with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.QUEUE_NOT_FOUND).message, status: getQueueMessage(QueueMessageKey.QUEUE_NOT_FOUND).code });
      return res.json(response);
    }

    const response: ApiResponse<Queue> = createApiResponse({ success: true, data: queue, message: getQueueMessage(QueueMessageKey.QUEUE_UPDATED).message, status: getQueueMessage(QueueMessageKey.QUEUE_UPDATED).code });
    logger.info(getQueueMessage(QueueMessageKey.QUEUE_UPDATED).message);
    return res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving queue with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.FAILED_TO_RETRIEVE_QUEUE).message, status: getQueueMessage(QueueMessageKey.FAILED_TO_RETRIEVE_QUEUE).code });
    return res.json(response);
  }
};
