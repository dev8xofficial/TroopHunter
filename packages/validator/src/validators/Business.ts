import * as z from 'zod';

import { BusinessPhoneSchema } from './BusinessPhone';
import { GeoPointSchema } from './GeoPoint';
import { TimezoneCreateRequestSchema } from './Timezone';
import validationMiddleware from '../middleware/validationMiddleware';

export const BusinessSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  businessDomain: z
    .string()
    .transform((val) => val.toLowerCase())
    .optional(),
  categoryId: z.string().uuid().optional(),
  address: z.string().optional(),
  cityId: z.string().uuid(),
  stateId: z.string().uuid(),
  countryId: z.string().uuid(),
  longitude: z.number(),
  latitude: z.number(),
  geoPoint: GeoPointSchema.optional(),
  postalCodeId: z.string().uuid().optional(),
  phoneId: z.string().uuid().optional(),
  email: z.string().optional().optional(),
  website: z.string().optional().optional(),
  ratingId: z.string().uuid().optional(),
  reviews: z.number().optional().optional(),
  timezoneId: z.string().uuid().optional(),
  sourceId: z.string().uuid().optional(),
  socialMediaId: z.string().uuid().optional(),
  sponsoredAd: z.boolean().optional(),
  BusinessPhone: BusinessPhoneSchema,
});

export const BusinessFetchRequestSchema = BusinessSchema.extend({ range: z.string().optional(), phone: z.string().optional() }).omit({ id: true }).partial();

export const BusinessFetchRequestForLeadSchema = BusinessSchema.omit({ id: true }).partial();

export const BusinessFetchByIdRequestSchema = BusinessSchema.pick({ id: true });

export const BusinessCreateRequestSchema = BusinessSchema.extend({
  category: z.string().optional(),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
  rating: z.number().optional(),
  timezone: TimezoneCreateRequestSchema.optional(),
  source: z.string().optional(),
  operatingHours: z
    .array(
      z.object({
        day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
        openingHour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, must be HH:MM'),
        closingHour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, must be HH:MM'),
      }),
    )
    .optional(),
}).omit({ id: true, categoryId: true, postalCodeId: true, phoneId: true, ratingId: true, timezoneId: true, sourceId: true, BusinessPhone: true });

export const BulkBusinessCreateRequestSchema = z.array(BusinessCreateRequestSchema);

export const BusinessUpdateRequestSchema = BusinessSchema.omit({ id: true }).partial();

export const BusinessFetchRequestValidationMiddleware = validationMiddleware(BusinessFetchRequestSchema, 'query');
export const BusinessFetchByIdRequestValidationMiddleware = validationMiddleware(BusinessFetchByIdRequestSchema, 'params');
export const BusinessCreateRequestValidationMiddleware = validationMiddleware(BusinessCreateRequestSchema, 'body');
export const BulkBusinessCreateRequestValidationMiddleware = validationMiddleware(BulkBusinessCreateRequestSchema, 'body');
export const BusinessUpdateRequestValidationMiddleware = validationMiddleware(BusinessUpdateRequestSchema, 'body');
