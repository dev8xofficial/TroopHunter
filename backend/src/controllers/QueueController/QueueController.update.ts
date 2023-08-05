import { Request, Response } from 'express';
import Queue from '../../models/Queue/Queue.model';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { IQueueRequestAttributes, IQueueResponseAttributes } from '../../models/Queue/Queue.interface';
import { createApiResponse } from '../../utils/response';
import { QueueMessageKey, getQueueMessage } from '../../models/Queue/Queue.messages';
import { QueueSchema, createQueueErrorResponse } from '../../models/Queue/Queue.schema';

export const updateQueue = async (req: Request, res: Response) => {
  const { error: paramsError, value: validatedParamsData } = QueueSchema.validate(req.params, { abortEarly: false });
  const { id } = validatedParamsData as IQueueResponseAttributes;

  const { error, value: validatedData } = QueueSchema.validate(req.body, { abortEarly: false });
  const { searchQuery, laptopName, status } = validatedData as IQueueRequestAttributes;

  try {
    if (paramsError) {
      const errorResponse = createQueueErrorResponse(paramsError);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }
    if (error) {
      const errorResponse = createQueueErrorResponse(error);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

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
