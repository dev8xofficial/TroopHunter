import { Request, Response } from 'express';
import Queue from '../../models/Queue/Queue.model';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { IQueueResponseAttributes } from '../../models/Queue/Queue.interface';
import { createApiResponse } from '../../utils/response';
import { QueueMessageKey, getQueueMessage } from '../../models/Queue/Queue.messages';
import { QueueSchema, createQueueErrorResponse } from '../../models/Queue/Queue.validator';

export const getQueues = async (req: Request, res: Response) => {
  try {
    const queues = await Queue.findAll({
      order: [['searchQuery', 'ASC']],
    });

    const response: ApiResponse<Queue[]> = createApiResponse({ success: true, data: queues, message: getQueueMessage(QueueMessageKey.QUEUES_RETRIEVED).message, status: getQueueMessage(QueueMessageKey.QUEUES_RETRIEVED).code });
    logger.info(getQueueMessage(QueueMessageKey.QUEUES_RETRIEVED).message);
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving queues:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.FAILED_TO_RETRIEVE_QUEUES).message, status: getQueueMessage(QueueMessageKey.FAILED_TO_RETRIEVE_QUEUES).code });
    res.json(response);
  }
};

export const getQueueById = async (req: Request, res: Response) => {
  const { error, value: validatedData } = QueueSchema.validate(req.params, { abortEarly: false });
  const { id } = validatedData as IQueueResponseAttributes;

  try {
    if (error) {
      const errorResponse = createQueueErrorResponse(error);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

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
