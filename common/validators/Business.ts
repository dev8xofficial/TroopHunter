import Joi from 'joi';
import { IBusinessResponseAttributes, IBusinessCreationRequestAttributes, IBusinessFetchRequestAttributes } from '../interfaces/Business';
import { GeoPointSchema } from './GeoPoint';
import { TimezoneCreateRequestSchema } from './Timezone';
import validationMiddleware from '../middleware/validationMiddleware';

export const BusinessSchema = Joi.object<IBusinessResponseAttributes>({
  id: Joi.string().guid().required(),
  name: Joi.string().required(),
  businessDomain: Joi.string().lowercase(),
  categoryId: Joi.string().guid(),
  address: Joi.string().required(),
  cityId: Joi.string().guid().required(),
  stateId: Joi.string().guid().required(),
  countryId: Joi.string().guid().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  geoPoint: GeoPointSchema,
  postalCodeId: Joi.string().guid(),
  phoneId: Joi.string().guid(),
  email: Joi.string(),
  website: Joi.string(),
  ratingId: Joi.string().guid(),
  reviews: Joi.number(),
  timezoneId: Joi.string().guid(),
  sourceId: Joi.string().guid(),
  socialMediaId: Joi.string().guid(),
  sponsoredAd: Joi.boolean(),
  openingHourId: Joi.string().guid(),
  closingHourId: Joi.string().guid(),
});

export const BusinessCreateRequestSchema = BusinessSchema.append<IBusinessCreationRequestAttributes>({
  category: Joi.string(),
  postalCode: Joi.string(),
  phone: Joi.string(),
  rating: Joi.number(),
  timezone: TimezoneCreateRequestSchema,
  source: Joi.string(),
  openingHour: Joi.string(),
  closingHour: Joi.string(),
}).fork(['id', 'categoryId', 'postalCodeId', 'phoneId', 'ratingId', 'timezoneId', 'sourceId', 'openingHourId', 'closingHourId'], (schema) => schema.optional());

export const BusinessFetchOrUpdateRequestSchema = BusinessSchema.append<IBusinessFetchRequestAttributes>({
  range: Joi.string(),
  phone: Joi.string(),
}).fork(['id', 'name', 'businessDomain', 'categoryId', 'address', 'cityId', 'stateId', 'countryId', 'longitude', 'latitude', 'geoPoint', 'postalCodeId', 'phoneId', 'email', 'website', 'ratingId', 'reviews', 'timezoneId', 'sourceId', 'socialMediaId', 'sponsoredAd', 'openingHourId', 'closingHourId'], (schema) => schema.optional());

export const BusinessFetchByIdRequestSchema = BusinessSchema.fork(['name', 'businessDomain', 'categoryId', 'address', 'cityId', 'stateId', 'countryId', 'longitude', 'latitude', 'geoPoint', 'postalCodeId', 'phoneId', 'email', 'website', 'ratingId', 'reviews', 'timezoneId', 'sourceId', 'socialMediaId', 'sponsoredAd', 'openingHourId', 'closingHourId'], (schema) => schema.optional());

export const businessFetchRequestValidationMiddleware = validationMiddleware(BusinessFetchOrUpdateRequestSchema, 'query');
export const businessFetchByIdRequestValidationMiddleware = validationMiddleware(BusinessFetchByIdRequestSchema, 'params');
export const businessCreateRequestValidationMiddleware = validationMiddleware(BusinessCreateRequestSchema, 'body');
export const businessUpdateRequestValidationMiddleware = validationMiddleware(BusinessFetchOrUpdateRequestSchema, 'body');
