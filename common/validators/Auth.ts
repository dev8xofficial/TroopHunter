import Joi from 'joi';
import { IUserRequestAttributes } from '../interfaces/User';
import validationMiddleware from '../middleware/validationMiddleware';

export const AuthSchema = Joi.object<IUserRequestAttributes>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const authUserFetchRequestValidationMiddleware = validationMiddleware(AuthSchema, 'body');
