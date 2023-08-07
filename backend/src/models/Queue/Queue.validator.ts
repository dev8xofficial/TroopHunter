import Joi from 'joi';
import { IQueueResponseAttributes } from './Queue.interface';
import { QueueMessageKey, getQueueMessage } from './Queue.messages';

export const QueueSchema = Joi.object<IQueueResponseAttributes>({
  id: Joi.number().integer().required(),
  searchQuery: Joi.string().required(),
  laptopName: Joi.string().required(),
  status: Joi.string().valid('Pending', 'Completed').required(),
});

export const createQueueErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getQueueMessage(QueueMessageKey.MISSING_QUEUE_ID).message;
            errorResponse.status = getQueueMessage(QueueMessageKey.MISSING_QUEUE_ID).code;
            break;
          case 'number.base':
            errorResponse.error = getQueueMessage(QueueMessageKey.INVALID_QUEUE_ID).message;
            errorResponse.status = getQueueMessage(QueueMessageKey.INVALID_QUEUE_ID).code;
            break;
        }
        break;
      case 'searchQuery':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getQueueMessage(QueueMessageKey.MISSING_QUEUE_SEARCH).message;
            errorResponse.status = getQueueMessage(QueueMessageKey.MISSING_QUEUE_SEARCH).code;
            break;
          case 'string.base':
            errorResponse.error = getQueueMessage(QueueMessageKey.INVALID_QUEUE_SEARCH).message;
            errorResponse.status = getQueueMessage(QueueMessageKey.INVALID_QUEUE_SEARCH).code;
            break;
        }
        break;
      case 'laptopName':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getQueueMessage(QueueMessageKey.MISSING_QUEUE_LAPTOP_NAME).message;
            errorResponse.status = getQueueMessage(QueueMessageKey.MISSING_QUEUE_LAPTOP_NAME).code;
            break;
          case 'string.base':
            errorResponse.error = getQueueMessage(QueueMessageKey.INVALID_QUEUE_LAPTOP_NAME).message;
            errorResponse.status = getQueueMessage(QueueMessageKey.INVALID_QUEUE_LAPTOP_NAME).code;
            break;
        }
        break;
      case 'status':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getQueueMessage(QueueMessageKey.MISSING_QUEUE_STATUS).message;
            errorResponse.status = getQueueMessage(QueueMessageKey.MISSING_QUEUE_STATUS).code;
            break;
          case 'string.valid':
            errorResponse.error = getQueueMessage(QueueMessageKey.INVALID_QUEUE_STATUS).message;
            errorResponse.status = getQueueMessage(QueueMessageKey.INVALID_QUEUE_STATUS).code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
