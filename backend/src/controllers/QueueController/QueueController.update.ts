import { Request, Response } from 'express';
import Queue from '../../models/Queue';
import logger from '../../utils/logger';
import { ApiResponse } from 'common/interfaces/Response';
import { createApiResponse } from 'common/utils/response';
import { QueueMessageKey, getQueueMessage } from '../../messages/Queue';
import { IQueueRequestAttributes } from 'common/interfaces/Queue';

export const updateQueue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { searchQuery, laptopName, status }: IQueueRequestAttributes = req.body;

  try {
    const queue = await Queue.findByPk(id);

    if (queue) {
      queue.searchQuery = searchQuery;
      queue.laptopName = laptopName;
      queue.status = status;
      await queue.save();

      const response: ApiResponse<Queue> = createApiResponse({ success: true, data: queue, message: getQueueMessage(QueueMessageKey.QUEUE_UPDATED).message, status: getQueueMessage(QueueMessageKey.QUEUE_UPDATED).code });
      logger.info(getQueueMessage(QueueMessageKey.QUEUE_UPDATED).message);
      res.json(response);
    } else {
      logger.warn(`Queue with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.QUEUE_NOT_FOUND).message, status: getQueueMessage(QueueMessageKey.QUEUE_NOT_FOUND).code });
      res.json(response);
    }
  } catch (error) {
    logger.error(`Error updating queue with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.FAILED_TO_UPDATE_QUEUE).message, status: getQueueMessage(QueueMessageKey.FAILED_TO_UPDATE_QUEUE).code });
    res.json(response);
  }
};
