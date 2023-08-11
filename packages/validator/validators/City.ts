import { z } from 'zod';
import validationMiddleware from '../middleware/validationMiddleware';

export const CitySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  state: z.string(),
  stateCode: z.string(),
  country: z.string(),
  countryCode: z.string(),
  longitude: z.number(),
  latitude: z.number(),
});

export const CityFetchRequestSchema = CitySchema.omit({ id: true }).partial();

export const CityFetchByIdRequestSchema = CitySchema.pick({ id: true });

export const CityCreateRequestSchema = CitySchema.omit({ id: true });

export const CityUpdateRequestSchema = CitySchema.omit({ id: true }).partial();

export const CityFetchRequestValidationMiddleware = validationMiddleware(CityFetchRequestSchema, 'query');
export const CityFetchByIdRequestValidationMiddleware = validationMiddleware(CityFetchByIdRequestSchema, 'params');
export const CityCreateRequestValidationMiddleware = validationMiddleware(CityCreateRequestSchema, 'body');
export const CityUpdateRequestValidationMiddleware = validationMiddleware(CityUpdateRequestSchema, 'body');
