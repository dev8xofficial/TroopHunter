import { z } from 'zod';

import validationMiddleware from '../middleware/validationMiddleware';

export const StateSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  code: z.string(),
  countryCode: z.string(),
  longitude: z.number(),
  latitude: z.number(),
});

export const StateFetchRequestSchema = StateSchema.omit({ id: true }).partial();

export const StateFetchByIdRequestSchema = StateSchema.pick({ id: true });

export const StateCreateRequestSchema = StateSchema.omit({ id: true });

export const StateUpdateRequestSchema = StateSchema.omit({ id: true }).partial();

export const StateFetchRequestValidationMiddleware = validationMiddleware(StateFetchRequestSchema, 'query');
export const StateFetchByIdRequestValidationMiddleware = validationMiddleware(StateFetchByIdRequestSchema, 'params');
export const StateCreateRequestValidationMiddleware = validationMiddleware(StateCreateRequestSchema, 'body');
export const StateUpdateRequestValidationMiddleware = validationMiddleware(StateUpdateRequestSchema, 'body');
