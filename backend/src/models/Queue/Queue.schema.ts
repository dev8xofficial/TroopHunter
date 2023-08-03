import Joi from 'joi';
import { QueueAttributes } from './Queue.interface';

export const QueueSchema = Joi.object<QueueAttributes>({
  id: Joi.number().integer().required(),
  searchQuery: Joi.string().required(),
  laptopName: Joi.string().required(),
  status: Joi.string().valid('Pending', 'Completed').required(),
});
