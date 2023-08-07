import Joi from 'joi';
import { IBusinessResponseAttributes, IBusinessCreationRequestAttributes, IBusinessFetchRequestAttributes } from './Business.interface';
import { GeoPointSchema } from '../../validators/GeoPoint.validator';
import { TimezoneSchema } from '../Timezone/Timezone.validator';
import { NextFunction, Request, Response } from 'express';
import { createApiResponse } from '../../utils/response';
import { ApiResponse } from '../../types/Response.interface';

export const BusinessSchema = Joi.object<IBusinessResponseAttributes>({
  id: Joi.string().guid({ version: ['uuidv4'] }),
  name: Joi.string().required(),
  businessDomain: Joi.string(),
  categoryId: Joi.string(),
  address: Joi.string().required(),
  cityId: Joi.string(),
  stateId: Joi.string(),
  countryId: Joi.string(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  geoPoint: GeoPointSchema.required(),
  postalCodeId: Joi.string().optional(),
  phoneId: Joi.string(),
  email: Joi.string(),
  website: Joi.string(),
  ratingId: Joi.string(),
  reviews: Joi.number(),
  timezoneId: Joi.string(),
  sourceId: Joi.string(),
  socialMediaId: Joi.string(),
  sponsoredAd: Joi.boolean(),
  openingHourId: Joi.string(),
  closingHourId: Joi.string(),
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

export const BusinessFetchRequestSchema = BusinessSchema.append<IBusinessFetchRequestAttributes>({
  cityName: Joi.string(),
  stateName: Joi.string(),
  countryName: Joi.string(),
  range: Joi.string(),
  phone: Joi.string(),
}).fork(['id', 'name', 'businessDomain', 'categoryId', 'address', 'cityId', 'stateId', 'countryId', 'longitude', 'latitude', 'geoPoint', 'postalCodeId', 'phoneId', 'email', 'website', 'ratingId', 'reviews', 'timezoneId', 'sourceId', 'socialMediaId', 'sponsoredAd', 'openingHourId', 'closingHourId'], (schema) => schema.optional());

export const businessRequestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = BusinessSchema.validate(req.body, { abortEarly: false, allowUnknown: true, stripUnknown: true, errors: { escapeHtml: true } });
  if (error) {
    const response: ApiResponse<null> = createApiResponse({
      error: error.details[0].message,
      status: 400,
    });
    return res.json(response);
  }

  next();
};

export const businessCreationRequestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = BusinessCreateRequestSchema.validate(req.body, { abortEarly: false, allowUnknown: true, stripUnknown: true, errors: { escapeHtml: true } });
  if (error) {
    const response: ApiResponse<null> = createApiResponse({
      error: error.details[0].message,
      status: 400,
    });
    return res.json(response);
  }

  next();
};

export const businessFetchRequestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error: requestError } = BusinessFetchRequestSchema.validate(req.query, { abortEarly: false, allowUnknown: true, stripUnknown: true, errors: { escapeHtml: true } });
  if (requestError) {
    const response: ApiResponse<null> = createApiResponse({
      error: requestError.details[0].message,
      status: 400,
    });
    return res.json(response);
  }

  next();
};
