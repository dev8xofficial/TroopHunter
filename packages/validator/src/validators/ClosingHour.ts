import { z } from 'zod';

import validationMiddleware from '../middleware/validationMiddleware';

export const ClosingHourSchema = z.object({
  id: z.string().uuid(),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, must be HH:MM'),
});

export const ClosingHourCreateRequestSchema = ClosingHourSchema.omit({ id: true });

export const ClosingHourCreateRequestValidationMiddleware = validationMiddleware(ClosingHourCreateRequestSchema, 'body');
