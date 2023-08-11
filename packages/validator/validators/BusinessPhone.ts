import { z } from 'zod';
import validationMiddleware from '../middleware/validationMiddleware';

export const BusinessPhoneSchema = z.object({
  id: z.string().uuid(),
  countryCode: z.string(),
  regionCode: z.string(),
  number: z.string(),
  numberNationalFormatted: z.string(),
  numberInternationalFormatted: z.string(),
  numberType: z.string(),
  isValid: z.boolean(),
});

export const BusinessPhoneFetchRequestSchema = BusinessPhoneSchema.omit({ id: true }).partial();
export const BusinessPhoneFetchByIdRequestSchema = BusinessPhoneSchema.pick({ id: true });
export const BusinessPhoneCreateRequestSchema = BusinessPhoneSchema.omit({ id: true });
export const BusinessPhoneUpdateRequestSchema = BusinessPhoneSchema.omit({ id: true }).partial();

export const BusinessPhoneFetchRequestValidationMiddleware = validationMiddleware(BusinessPhoneFetchRequestSchema, 'query');
export const BusinessPhoneFetchByIdRequestValidationMiddleware = validationMiddleware(BusinessPhoneFetchByIdRequestSchema, 'params');
export const BusinessPhoneCreateRequestValidationMiddleware = validationMiddleware(BusinessPhoneCreateRequestSchema, 'body');
export const BusinessPhoneUpdateRequestValidationMiddleware = validationMiddleware(BusinessPhoneUpdateRequestSchema, 'body');
