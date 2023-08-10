import Joi from 'joi';
import { ICountryResponseAttributes } from '../interfaces/Country';
import validationMiddleware from '../middleware/validationMiddleware';

export const CountrySchema = Joi.object<ICountryResponseAttributes>({
  id: Joi.string().guid().required(),
  name: Joi.string().required(),
  code: Joi.string().required(),
  phoneCode: Joi.string().required(),
  currency: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});

export const CountryFetchOrUpdateRequestSchema = CountrySchema.keys({
  id: Joi.optional(),
  name: Joi.optional(),
  code: Joi.optional(),
  phoneCode: Joi.optional(),
  currency: Joi.optional(),
  longitude: Joi.optional(),
  latitude: Joi.optional(),
});

export const CountryFetchByIdRequestSchema = CountrySchema.keys({
  name: Joi.optional(),
  code: Joi.optional(),
  phoneCode: Joi.optional(),
  currency: Joi.optional(),
  longitude: Joi.optional(),
  latitude: Joi.optional(),
});

export const CountryCreateRequestSchema = CountrySchema.keys({
  id: Joi.optional(),
});

export const countryFetchRequestValidationMiddleware = validationMiddleware(CountryFetchOrUpdateRequestSchema, 'query');
export const countryFetchByIdRequestValidationMiddleware = validationMiddleware(CountryFetchByIdRequestSchema, 'params');
export const countryCreateRequestValidationMiddleware = validationMiddleware(CountryCreateRequestSchema, 'body');
export const countryUpdateRequestValidationMiddleware = validationMiddleware(CountryFetchOrUpdateRequestSchema, 'body');
