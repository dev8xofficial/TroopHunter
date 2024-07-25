import { z } from 'zod';
import validationMiddleware from '../middleware/validationMiddleware';

export const QueueSchema = z.object({
  id: z.string().uuid(),
  searchQuery: z.string(),
  laptopName: z.string(),
});

export const QueueFetchRequestSchema = QueueSchema.omit({ id: true }).partial();

export const QueueFetchByIdRequestSchema = QueueSchema.pick({ id: true });

export const QueueCreateRequestSchema = QueueSchema.omit({ id: true });

export const QueueUpdateRequestSchema = QueueSchema.omit({ id: true }).partial();

export const QueueFetchRequestValidationMiddleware = validationMiddleware(QueueFetchRequestSchema, 'query');
export const QueueFetchByIdRequestValidationMiddleware = validationMiddleware(QueueFetchByIdRequestSchema, 'params');
export const QueueCreateRequestValidationMiddleware = validationMiddleware(QueueCreateRequestSchema, 'body');
export const QueueUpdateRequestValidationMiddleware = validationMiddleware(QueueUpdateRequestSchema, 'body');
