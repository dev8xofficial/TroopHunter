import { z } from 'zod';
import validationMiddleware from '../middleware/validationMiddleware';

export const BusinessSourceSchema = z.object({
  id: z.string().uuid(),
  sourceName: z.string(),
});

export const BusinessSourceFetchBySourceNameRequestSchema = BusinessSourceSchema.pick({ sourceName: true });

export const BusinessSourceFetchBySourceNameRequestValidationMiddleware = validationMiddleware(BusinessSourceFetchBySourceNameRequestSchema, 'params');
