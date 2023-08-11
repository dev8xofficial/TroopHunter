import { z } from 'zod';
import validationMiddleware from '../middleware/validationMiddleware';

export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1).max(100),
});

export const PaginationRequestValidationMiddleware = validationMiddleware(PaginationSchema, 'query');
