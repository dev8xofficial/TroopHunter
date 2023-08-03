import Joi from 'joi';
import { CityAttributes } from './City.interface';
import { getCityMessage } from './City.messages';

export const CitySchema = Joi.object<CityAttributes>({
  id: Joi.string(),
  name: Joi.string()
    .required()
    .messages({
      'any.required': getCityMessage('MISSING_CITY').message,
    }),
  stateCode: Joi.string().required(),
  countryCode: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});
