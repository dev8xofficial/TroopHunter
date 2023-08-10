import Joi from 'joi';
import { IQueueResponseAttributes } from '../interfaces/Queue';
import validationMiddleware from '../middleware/validationMiddleware';

export const QueueSchema = Joi.object<IQueueResponseAttributes>({
  id: Joi.number().integer().required(),
  searchQuery: Joi.string().required(),
  laptopName: Joi.string().required(),
  status: Joi.string().valid('Pending', 'Completed').required(),
});

export const QueueFetchOrUpdateRequestSchema = QueueSchema.keys({
  id: Joi.optional(),
  searchQuery: Joi.optional(),
  laptopName: Joi.optional(),
  status: Joi.optional(),
});

export const QueueFetchByIdRequestSchema = QueueSchema.keys({
  searchQuery: Joi.optional(),
  laptopName: Joi.optional(),
  status: Joi.optional(),
});

export const QueueCreateRequestSchema = QueueSchema.keys({
  id: Joi.optional(),
});

export const queueFetchRequestValidationMiddleware = validationMiddleware(QueueFetchOrUpdateRequestSchema, 'query');
export const queueFetchByIdRequestValidationMiddleware = validationMiddleware(QueueFetchByIdRequestSchema, 'params');
export const queueCreateRequestValidationMiddleware = validationMiddleware(QueueCreateRequestSchema, 'body');
export const queueUpdateRequestValidationMiddleware = validationMiddleware(QueueFetchOrUpdateRequestSchema, 'body');
