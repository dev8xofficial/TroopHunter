import { Request, Response } from 'express';
import Queue from '../models/Queue/Queue.model';
import logger from '../utils/logger';
import { getMessage } from '../utils/message';
import { ApiResponse } from '../types/Response.interface';
import { createApiResponse } from '../utils/response';
import { getQueueMessage } from '../models/Queue/Queue.messages';

export const getQueues = async (req: Request, res: Response) => {
  try {
    const queues = await Queue.findAll({
      order: [['searchQuery', 'ASC']],
    });

    const response: ApiResponse<Queue[]> = createApiResponse({ success: true, data: queues, message: getQueueMessage('QUEUES_RETRIEVED').message, status: getQueueMessage('QUEUES_RETRIEVED').code });
    logger.info(getQueueMessage('QUEUES_RETRIEVED').message);
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving queues:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage('FAILED_TO_RETRIEVE_QUEUES').message, status: getQueueMessage('FAILED_TO_RETRIEVE_QUEUES').code });
    res.json(response);
  }
};

export const getQueueById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const queue = await Queue.findOne({ where: { id } });

    if (!queue) {
      logger.warn(`Queue with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage('QUEUE_NOT_FOUND').message, status: getQueueMessage('QUEUE_NOT_FOUND').code });
      return res.json(response);
    }

    const response: ApiResponse<Queue> = createApiResponse({ success: true, data: queue, message: getQueueMessage('QUEUE_UPDATED').message, status: getQueueMessage('QUEUE_UPDATED').code });
    logger.info(getQueueMessage('QUEUE_UPDATED').message);
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving queue with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_QUEUE').message, status: getMessage('FAILED_TO_RETRIEVE_QUEUE').code });
    res.json(response);
  }
};

export const updateQueue = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { laptopName, status } = req.body;

    const queue = await Queue.findByPk(id);

    if (queue) {
      queue.laptopName = laptopName;
      queue.status = status;
      await queue.save();

      const response: ApiResponse<Queue> = createApiResponse({ success: true, data: queue, message: getQueueMessage('QUEUE_UPDATED').message, status: getQueueMessage('QUEUE_UPDATED').code });
      logger.info(getQueueMessage('QUEUE_UPDATED').message);
      res.json(response);
    } else {
      logger.warn(`Queue with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage('QUEUE_NOT_FOUND').message, status: getQueueMessage('QUEUE_NOT_FOUND').code });
      res.json(response);
    }
  } catch (error) {
    logger.error('Error updating queue:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage('FAILED_TO_UPDATE_QUEUE').message, status: getQueueMessage('FAILED_TO_UPDATE_QUEUE').code });
    res.json(response);
  }
};
