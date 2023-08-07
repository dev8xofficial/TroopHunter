import Joi from 'joi';
import { IStateResponseAttributes } from './State.interface';
import validationMiddleware from '../../middlewares/validationMiddleware';

export const StateSchema = Joi.object<IStateResponseAttributes>({
  id: Joi.string().guid().required(),
  name: Joi.string().required(),
  code: Joi.string().required(),
  countryCode: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});

export const StateFetchOrUpdateRequestSchema = StateSchema.keys({
  id: Joi.optional(),
  name: Joi.optional(),
  code: Joi.optional(),
  countryCode: Joi.optional(),
  longitude: Joi.optional(),
  latitude: Joi.optional(),
});

export const StateFetchByIdRequestSchema = StateSchema.keys({
  name: Joi.optional(),
  code: Joi.optional(),
  countryCode: Joi.optional(),
  longitude: Joi.optional(),
  latitude: Joi.optional(),
});

export const StateCreateRequestSchema = StateSchema.keys({
  id: Joi.optional(),
});

export const stateFetchRequestValidationMiddleware = validationMiddleware(StateFetchOrUpdateRequestSchema, 'query');
export const stateFetchByIdRequestValidationMiddleware = validationMiddleware(StateFetchByIdRequestSchema, 'params');
export const stateCreateRequestValidationMiddleware = validationMiddleware(StateCreateRequestSchema, 'body');
export const stateUpdateRequestValidationMiddleware = validationMiddleware(StateFetchOrUpdateRequestSchema, 'body');
