import Joi from 'joi';
import { UserAttributes } from './User.interface';

export const UserSchema = Joi.object<UserAttributes>({
  id: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  role: Joi.string().valid('guest', 'user', 'admin').optional(),
});
