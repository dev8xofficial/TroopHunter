import { z } from 'zod';

import validationMiddleware from '../middleware/validationMiddleware';

export const BusinessDaySchema = z.object({
  id: z.string().uuid(),
  businessId: z.string().uuid(),
  dayId: z.string().uuid(),
});

export const BusinessDayCreateRequestSchema = BusinessDaySchema.omit({ id: true });

export const BusinessDayCreateRequestValidationMiddleware = validationMiddleware(BusinessDayCreateRequestSchema, 'body');
