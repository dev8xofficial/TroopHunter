import Joi from 'joi';
import { ICityResponseAttributes } from './City.interface';
import validationMiddleware from '../../middlewares/validationMiddleware';

export const CitySchema = Joi.object<ICityResponseAttributes>({
  id: Joi.string().guid().required(),
  name: Joi.string().required(),
  state: Joi.string().required(),
  stateCode: Joi.string().required(),
  country: Joi.string().required(),
  countryCode: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});

export const CityFetchOrUpdateRequestSchema = CitySchema.keys({
  id: Joi.optional(),
  name: Joi.optional(),
  state: Joi.optional(),
  stateCode: Joi.optional(),
  country: Joi.optional(),
  countryCode: Joi.optional(),
  longitude: Joi.optional(),
  latitude: Joi.optional(),
});

export const CityFetchByIdRequestSchema = CitySchema.keys({
  name: Joi.optional(),
  state: Joi.optional(),
  stateCode: Joi.optional(),
  country: Joi.optional(),
  countryCode: Joi.optional(),
  longitude: Joi.optional(),
  latitude: Joi.optional(),
});

export const CityCreateRequestSchema = CitySchema.keys({
  id: Joi.optional(),
});

export const cityFetchRequestValidationMiddleware = validationMiddleware(CityFetchOrUpdateRequestSchema, 'query');
export const cityFetchByIdRequestValidationMiddleware = validationMiddleware(CityFetchByIdRequestSchema, 'params');
export const cityCreateRequestValidationMiddleware = validationMiddleware(CityCreateRequestSchema, 'body');
export const cityUpdateRequestValidationMiddleware = validationMiddleware(CityFetchOrUpdateRequestSchema, 'body');
