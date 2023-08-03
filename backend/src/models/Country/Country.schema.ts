import Joi from 'joi';
import { CountryAttributes } from './Country.interface';
import { getCountryMessage } from './Country.messages';

export const CountrySchema = Joi.object<CountryAttributes>({
  id: Joi.string(),
  name: Joi.string()
    .required()
    .messages({
      'any.required': getCountryMessage('MISSING_COUNTRY_NAME').message,
    }),
  code: Joi.string()
    .required()
    .messages({
      'any.required': getCountryMessage('MISSING_COUNTRY_CODE').message,
    }),
  phoneCode: Joi.string()
    .required()
    .messages({
      'any.required': getCountryMessage('MISSING_COUNTRY_PHONE_CODE').message,
    }),
  currency: Joi.string()
    .required()
    .messages({
      'any.required': getCountryMessage('MISSING_COUNTRY_CURRENCY').message,
    }),
  longitude: Joi.number()
    .required()
    .messages({
      'any.required': getCountryMessage('MISSING_COUNTRY_LONGITUDE').message,
    }),
  latitude: Joi.number()
    .required()
    .messages({
      'any.required': getCountryMessage('MISSING_COUNTRY_LATITUDE').message,
    }),
});
