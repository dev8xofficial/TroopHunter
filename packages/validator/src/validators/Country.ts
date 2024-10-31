import { z } from 'zod';

import validationMiddleware from '../middleware/validationMiddleware';

export const CountrySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  code: z.string(),
  phoneCode: z.string(),
  currency: z.string(),
  longitude: z.number(),
  latitude: z.number(),
});

export const CountryFetchRequestSchema = CountrySchema.omit({ id: true }).partial();
export const CountryFetchByIdRequestSchema = CountrySchema.pick({ id: true });
export const CountryCreateRequestSchema = CountrySchema.omit({ id: true });
export const CountryUpdateRequestSchema = CountrySchema.omit({ id: true }).partial();

export const CountryFetchRequestValidationMiddleware = validationMiddleware(CountryFetchRequestSchema, 'query');
export const CountryFetchByIdRequestValidationMiddleware = validationMiddleware(CountryFetchByIdRequestSchema, 'params');
export const CountryCreateRequestValidationMiddleware = validationMiddleware(CountryCreateRequestSchema, 'body');
export const CountryUpdateRequestValidationMiddleware = validationMiddleware(CountryUpdateRequestSchema, 'body');
