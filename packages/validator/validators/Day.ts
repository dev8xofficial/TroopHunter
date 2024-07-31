import { z } from 'zod';
import validationMiddleware from '../middleware/validationMiddleware';

export const DaySchema = z.object({
  id: z.string().uuid(),
  day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
});

export const DayCreateRequestSchema = DaySchema.omit({ id: true });

export const DayCreateRequestValidationMiddleware = validationMiddleware(DayCreateRequestSchema, 'body');
