import Joi from 'joi';
import { IBusinessResponseAttributes, IBusinessCreationRequestAttributes, IBusinessFetchRequestAttributes } from './Business.interface';
import { GeoPointSchema } from '../../validators/GeoPoint.validator';
import { TimezoneSchema } from '../Timezone/Timezone.validator';
import validationMiddleware from '../../middlewares/validationMiddleware';

export const BusinessSchema = Joi.object<IBusinessResponseAttributes>({
  id: Joi.string().guid().required(),
  name: Joi.string().required(),
  businessDomain: Joi.string(),
  categoryId: Joi.string().guid(),
  address: Joi.string().required(),
  cityId: Joi.string().guid(),
  stateId: Joi.string().guid(),
  countryId: Joi.string().guid(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  geoPoint: GeoPointSchema.required(),
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
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  postalCode: Joi.string(),
  phone: Joi.string(),
  rating: Joi.number(),
  timezone: TimezoneSchema,
  source: Joi.string(),
  openingHour: Joi.string(),
  closingHour: Joi.string(),
}).fork(['id', 'categoryId', 'cityId', 'stateId', 'countryId', 'postalCodeId', 'phoneId', 'ratingId', 'timezoneId', 'sourceId', 'openingHourId', 'closingHourId'], (schema) => schema.optional());

export const BusinessFetchOrUpdateRequestSchema = BusinessSchema.append<IBusinessFetchRequestAttributes>({
  cityName: Joi.string(),
  stateName: Joi.string(),
  countryName: Joi.string(),
  range: Joi.string(),
  phone: Joi.string(),
}).fork(['id', 'name', 'businessDomain', 'categoryId', 'address', 'cityId', 'stateId', 'countryId', 'longitude', 'latitude', 'geoPoint', 'postalCodeId', 'phoneId', 'email', 'website', 'ratingId', 'reviews', 'timezoneId', 'sourceId', 'socialMediaId', 'sponsoredAd', 'openingHourId', 'closingHourId'], (schema) => schema.optional());

export const BusinessFetchByIdRequestSchema = BusinessSchema.fork(['name', 'businessDomain', 'categoryId', 'address', 'cityId', 'stateId', 'countryId', 'longitude', 'latitude', 'geoPoint', 'postalCodeId', 'phoneId', 'email', 'website', 'ratingId', 'reviews', 'timezoneId', 'sourceId', 'socialMediaId', 'sponsoredAd', 'openingHourId', 'closingHourId'], (schema) => schema.optional());

export const businessFetchRequestValidationMiddleware = validationMiddleware(BusinessFetchOrUpdateRequestSchema, 'query');
export const businessFetchByIdRequestValidationMiddleware = validationMiddleware(BusinessFetchByIdRequestSchema, 'params');
export const businessCreateRequestValidationMiddleware = validationMiddleware(BusinessCreateRequestSchema, 'body');
export const businessUpdateRequestValidationMiddleware = validationMiddleware(BusinessFetchOrUpdateRequestSchema, 'body');
