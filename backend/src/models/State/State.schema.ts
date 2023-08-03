import Joi from 'joi';
import { StateAttributes } from './State.interface';
import { getStateMessage } from './State.messages';

export const StateSchema = Joi.object<StateAttributes>({
  id: Joi.string(),
  name: Joi.string()
    .required()
    .messages({
      'any.required': getStateMessage('MISSING_STATE').message,
    }),
  code: Joi.string()
    .required()
    .messages({
      'any.required': getStateMessage('MISSING_STATE_CODE').message,
    }),
  countryCode: Joi.string()
    .required()
    .messages({
      'any.required': getStateMessage('MISSING_STATE_COUNTRY_CODE').message,
    }),
  longitude: Joi.number()
    .required()
    .messages({
      'any.required': getStateMessage('MISSING_STATE_LONGITUDE').message,
    }),
  latitude: Joi.number()
    .required()
    .messages({
      'any.required': getStateMessage('MISSING_STATE_LATITUDE').message,
    }),
});
