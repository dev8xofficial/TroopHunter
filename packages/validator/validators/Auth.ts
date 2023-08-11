import validationMiddleware from '../middleware/validationMiddleware';
import { UserSchema } from './User';

export const AuthSchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();

export const LoginRequestValidationMiddleware = validationMiddleware(AuthSchema, 'body');
