import { QueueMessageKey, getQueueMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IQueueAttributes, type IQueueFetchByIdRequestSchemaAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { Queue } from '../../models';

export const updateQueue = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IQueueFetchByIdRequestSchemaAttributes;
  const { searchQuery, laptopName } = req.body as IQueueAttributes;

  try {
    const queue = await Queue.findByPk(id);

    if (queue == null) {
      logger.warn(`Queue with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.QUEUE_NOT_FOUND).message, status: getQueueMessage(QueueMessageKey.QUEUE_NOT_FOUND).code });
      return res.json(response);
    }

    if (searchQuery != null) queue.searchQuery = searchQuery;
    if (laptopName != null) queue.laptopName = laptopName;

    await queue.save();

    const response: ApiResponse<Queue> = createApiResponse({ success: true, data: queue, message: getQueueMessage(QueueMessageKey.QUEUE_UPDATED).message, status: getQueueMessage(QueueMessageKey.QUEUE_UPDATED).code });
    logger.info(getQueueMessage(QueueMessageKey.QUEUE_UPDATED).message);
    return res.json(response);
  } catch (error) {
    logger.error(`Error updating queue with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getQueueMessage(QueueMessageKey.FAILED_TO_UPDATE_QUEUE).message, status: getQueueMessage(QueueMessageKey.FAILED_TO_UPDATE_QUEUE).code });
    return res.json(response);
  }
};
