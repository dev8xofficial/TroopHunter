import Joi from 'joi';
import { QueueAttributes } from './Queue.interface';
import { getQueueMessage } from './Queue.messages';

export const QueueSchema = Joi.object<QueueAttributes>({
  id: Joi.number().integer().required(),
  searchQuery: Joi.string().required(),
  laptopName: Joi.string()
    .required()
    .messages({
      'any.required': getQueueMessage('MISSING_LAPTOP_NAME').message,
    }),
  status: Joi.string()
    .valid('Pending', 'Completed')
    .required()
    .messages({
      'any.required': getQueueMessage('MISSING_STATUS').message,
    }),
});
