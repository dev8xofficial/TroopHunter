import { Request, Response } from 'express';
import Queue from '../models/Queue/Queue';
import logger from '../utils/logger';
import { getMessage } from '../utils/message';
import { ApiResponse } from '../types/response';
import { createApiResponse } from '../utils/response';

export const getQueues = async (req: Request, res: Response) => {
  try {
    const queues = await Queue.findAll({
      order: [['searchQuery', 'ASC']],
    });

    const response: ApiResponse<Queue[]> = createApiResponse({ success: true, data: queues, message: getMessage('QUEUES_RETRIEVED').message, status: getMessage('QUEUES_RETRIEVED').code });
    logger.info(getMessage('QUEUES_RETRIEVED').message);
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving queues:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_QUEUES').message, status: getMessage('FAILED_TO_RETRIEVE_QUEUES').code });
    res.json(response);
  }
};

export const getQueueById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const queue = await Queue.findOne({ where: { id } });

    if (!queue) {
      logger.warn(`Queue with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('QUEUE_NOT_FOUND').message, status: getMessage('QUEUE_NOT_FOUND').code });
      return res.json(response);
    }

    const response: ApiResponse<Queue> = createApiResponse({ success: true, data: queue, message: getMessage('QUEUE_UPDATED').message, status: getMessage('QUEUE_UPDATED').code });
    logger.info(getMessage('QUEUE_UPDATED').message);
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

      const response: ApiResponse<Queue> = createApiResponse({ success: true, data: queue, message: getMessage('QUEUE_UPDATED').message, status: getMessage('QUEUE_UPDATED').code });
      logger.info(getMessage('QUEUE_UPDATED').message);
      res.json(response);
    } else {
      logger.warn(`Queue with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('QUEUE_NOT_FOUND').message, status: getMessage('QUEUE_NOT_FOUND').code });
      res.json(response);
    }
  } catch (error) {
    logger.error('Error updating queue:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_UPDATE_QUEUE').message, status: getMessage('FAILED_TO_UPDATE_QUEUE').code });
    res.json(response);
  }
};
