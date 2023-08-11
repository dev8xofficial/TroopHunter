import { z } from 'zod';
import validationMiddleware from '../middleware/validationMiddleware';
import { LeadSchema } from './Lead';

export const UserSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['guest', 'user', 'admin']).optional(),
  Leads: z.array(LeadSchema).default([]),
});

export const UserFetchRequestSchema = UserSchema.omit({ id: true }).partial();

export const UserFetchByIdRequestSchema = UserSchema.pick({ id: true });

export const UserCreateRequestSchema = UserSchema.omit({ id: true });

export const UserUpdateRequestSchema = UserSchema.omit({ id: true }).partial();

export const UserFetchRequestValidationMiddleware = validationMiddleware(UserFetchRequestSchema, 'query');
export const UserFetchByIdRequestValidationMiddleware = validationMiddleware(UserFetchByIdRequestSchema, 'params');
export const UserCreateRequestValidationMiddleware = validationMiddleware(UserCreateRequestSchema, 'body');
export const UserUpdateRequestValidationMiddleware = validationMiddleware(UserUpdateRequestSchema, 'body');
