import Joi from 'joi';
import { UserAttributes } from './User.interface';
import { getUserMessage } from './User.messages';

export const UserSchema = Joi.object<UserAttributes>({
  id: Joi.string(),
  firstName: Joi.string()
    .required()
    .messages({
      'any.required': getUserMessage('MISSING_FIRST_NAME').message,
    }),
  lastName: Joi.string()
    .required()
    .messages({
      'any.required': getUserMessage('MISSING_LAST_NAME').message,
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': getUserMessage('MISSING_EMAIL').message,
      'string.email': getUserMessage('INVALID_EMAIL').message,
    }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      'any.required': getUserMessage('MISSING_PASSWORD').message,
      'string.min': getUserMessage('INVALID_PASSWORD').message,
    }),
  role: Joi.string().valid('guest', 'user', 'admin').optional(),
});
