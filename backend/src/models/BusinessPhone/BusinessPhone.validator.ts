import Joi from 'joi';
import { IBusinessPhoneResponseAttributes } from './BusinessPhone.interface';
import validationMiddleware from '../../middlewares/validationMiddleware';

export const BusinessPhoneSchema = Joi.object<IBusinessPhoneResponseAttributes>({
  id: Joi.string().guid().required(),
  countryCode: Joi.string().required(),
  regionCode: Joi.string().required(),
  number: Joi.string().required(),
  numberNationalFormatted: Joi.string().required(),
  numberInternationalFormatted: Joi.string().required(),
  numberType: Joi.string().required(),
  isValid: Joi.boolean().required(),
});

export const BusinessPhoneFetchOrUpdateRequestSchema = BusinessPhoneSchema.keys({
  id: Joi.optional(),
  countryCode: Joi.optional(),
  regionCode: Joi.optional(),
  number: Joi.optional(),
  numberNationalFormatted: Joi.optional(),
  numberInternationalFormatted: Joi.optional(),
  numberType: Joi.optional(),
  isValid: Joi.optional(),
});

export const BusinessPhoneFetchByIdRequestSchema = BusinessPhoneSchema.keys({
  countryCode: Joi.optional(),
  regionCode: Joi.optional(),
  number: Joi.optional(),
  numberNationalFormatted: Joi.optional(),
  numberInternationalFormatted: Joi.optional(),
  numberType: Joi.optional(),
  isValid: Joi.optional(),
});

export const BusinessPhoneCreateRequestSchema = BusinessPhoneSchema.keys({
  id: Joi.optional(),
});

export const businessPhoneFetchRequestValidationMiddleware = validationMiddleware(BusinessPhoneFetchOrUpdateRequestSchema, 'query');
export const businessPhoneFetchByIdRequestValidationMiddleware = validationMiddleware(BusinessPhoneFetchByIdRequestSchema, 'params');
export const businessPhoneCreateRequestValidationMiddleware = validationMiddleware(BusinessPhoneCreateRequestSchema, 'body');
export const businessPhoneUpdateRequestValidationMiddleware = validationMiddleware(BusinessPhoneFetchOrUpdateRequestSchema, 'body');
