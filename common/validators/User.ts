import Joi from 'joi';
import { IUserResponseAttributes } from '../interfaces/User';
import validationMiddleware from '../middleware/validationMiddleware';

export const UserSchema = Joi.object<IUserResponseAttributes>({
  id: Joi.string().guid().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  role: Joi.string().valid('guest', 'user', 'admin').optional(),
});

export const UserFetchOrUpdateRequestSchema = UserSchema.keys({
  id: Joi.optional(),
  firstName: Joi.optional(),
  lastName: Joi.optional(),
  email: Joi.optional(),
  password: Joi.optional(),
  role: Joi.optional(),
});

export const UserFetchByIdRequestSchema = UserSchema.keys({
  firstName: Joi.optional(),
  lastName: Joi.optional(),
  email: Joi.optional(),
  password: Joi.optional(),
  role: Joi.optional(),
});

export const UserCreateRequestSchema = UserSchema.keys({
  id: Joi.optional(),
});

export const userFetchRequestValidationMiddleware = validationMiddleware(UserFetchOrUpdateRequestSchema, 'query');
export const userFetchByIdRequestValidationMiddleware = validationMiddleware(UserFetchByIdRequestSchema, 'params');
export const userCreateRequestValidationMiddleware = validationMiddleware(UserCreateRequestSchema, 'body');
export const userUpdateRequestValidationMiddleware = validationMiddleware(UserFetchOrUpdateRequestSchema, 'body');
