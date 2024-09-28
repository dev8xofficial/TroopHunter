import { z } from 'zod';
import validationMiddleware from '../middleware/validationMiddleware';

export const CityQueueSchema = z.object({
  id: z.string().uuid(),
  cityId: z.string().uuid(),
  queueId: z.string().uuid(),
  businessSourceId: z.string().uuid(),
  status: z.enum(['Pending', 'Completed', 'Failed']),
});

export const CityQueueFetchRequestSchema = CityQueueSchema.omit({ id: true }).partial();

export const CityQueueFetchByIdRequestSchema = CityQueueSchema.pick({ id: true });

export const CityQueueCreateRequestSchema = CityQueueSchema.omit({ id: true });

export const CityQueueUpdateRequestSchema = CityQueueSchema.omit({ id: true }).partial();

export const CityQueueFetchRequestValidationMiddleware = validationMiddleware(CityQueueFetchRequestSchema, 'query');
export const CityQueueFetchByIdRequestValidationMiddleware = validationMiddleware(CityQueueFetchByIdRequestSchema, 'params');
export const CityQueueCreateRequestValidationMiddleware = validationMiddleware(CityQueueCreateRequestSchema, 'body');
export const CityQueueUpdateRequestValidationMiddleware = validationMiddleware(CityQueueUpdateRequestSchema, 'body');
