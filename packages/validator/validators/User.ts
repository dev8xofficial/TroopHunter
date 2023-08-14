import { z } from 'zod';
import validationMiddleware from '../middleware/validationMiddleware';
import { LeadSchema } from './Lead';

export const UserSchema = z.object({
  id: z.string().uuid().nonempty(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(8).nonempty(),
  role: z.enum(['guest', 'user', 'admin']).optional(),
  Leads: z.array(LeadSchema).default([]),
});

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();

export const LoginRequestSchema = UserSchema.pick({ email: true, password: true });
export const UserFetchRequestSchema = UserSchema.omit({ id: true }).partial();
export const UserFetchByIdRequestSchema = UserSchema.pick({ id: true });
export const UserCreateRequestSchema = UserSchema.omit({ id: true, Leads: true });
export const UserUpdateRequestSchema = UserSchema.omit({ id: true }).partial();

export const LoginRequestValidationMiddleware = validationMiddleware(LoginSchema, 'body');
export const UserFetchRequestValidationMiddleware = validationMiddleware(UserFetchRequestSchema, 'query');
export const UserFetchByIdRequestValidationMiddleware = validationMiddleware(UserFetchByIdRequestSchema, 'params');
export const UserCreateRequestValidationMiddleware = validationMiddleware(UserCreateRequestSchema, 'body');
export const UserUpdateRequestValidationMiddleware = validationMiddleware(UserUpdateRequestSchema, 'body');
