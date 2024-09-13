import { z } from 'zod';
import validationMiddleware from '../middleware/validationMiddleware';
import { LeadSchema } from './Lead';

export const UserSchema = z.object({
  id: z.string().uuid().nonempty(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .nonempty('Password cannot be empty')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain at least one letter, one number, and one special character'),
  role: z.enum(['guest', 'user', 'admin']).optional(),
  verified: z.boolean(),
  Leads: z.array(LeadSchema).default([]),
});

export const SendVerificationTokenSchema = UserSchema.pick({ email: true });
export const VerifyUserSchema = UserSchema.pick({ id: true }).extend({
  token: z.string().nonempty('User verification token must be attached in request.'),
});
export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();
export const RefreshTokenSchema = z.object({
  refreshToken: z.string().nonempty(),
});
export const LoginRequestSchema = UserSchema.pick({ email: true, password: true });
export const UserFetchRequestSchema = UserSchema.omit({ id: true }).partial();
export const UserFetchByIdRequestSchema = UserSchema.pick({ id: true });
export const UserCreateRequestSchema = UserSchema.omit({ id: true, verified: true, Leads: true, role: true });
export const UserUpdateNameRequestSchema = UserSchema.pick({ firstName: true, lastName: true });
export const UserUpdatePasswordRequestSchema = UserSchema.pick({ password: true })
  .extend({
    newPassword: z
      .string()
      .min(8, 'New Password must be at least 8 characters long')
      .nonempty('New Password cannot be empty')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain at least one letter, one number, and one special character'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters long')
      .nonempty('Confirm Password cannot be empty')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain at least one letter, one number, and one special character'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New and Confirm passwords doesn't match.",
    path: ['confirmPassword'],
  });
export const UserTokenRequestSchema = z.object({
  id: z.string().uuid().nonempty(),
  userId: z.string().uuid().nonempty(),
  accessToken: z.string().nonempty().nullable(),
  refreshToken: z.string().nonempty().nullable(),
});
export const ResetPasswordSchema = UserSchema.pick({ id: true }).extend({
  token: z.string().nonempty('User verification token must be attached in request.'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .nonempty('Password cannot be empty')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain at least one letter, one number, and one special character'),
  confirmPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .nonempty('Password cannot be empty')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain at least one letter, one number, and one special character'),
});
export const ResetPasswordVerificationSchema = ResetPasswordSchema.pick({ id: true, token: true });

export const SendVerificationTokenValidationMiddleware = validationMiddleware(SendVerificationTokenSchema, 'body');
export const VerifyUserValidationMiddleware = validationMiddleware(VerifyUserSchema, 'params');
export const LoginRequestValidationMiddleware = validationMiddleware(LoginSchema, 'body');
export const RefreshTokenValidationMiddleware = validationMiddleware(RefreshTokenSchema, 'body');
export const UserFetchRequestValidationMiddleware = validationMiddleware(UserFetchRequestSchema, 'query');
export const UserFetchByIdRequestValidationMiddleware = validationMiddleware(UserFetchByIdRequestSchema, 'params');
export const UserCreateRequestValidationMiddleware = validationMiddleware(UserCreateRequestSchema, 'body');
export const UserUpdateNameRequestValidationMiddleware = validationMiddleware(UserUpdateNameRequestSchema, 'body');
export const UserUpdatePasswordRequestValidationMiddleware = validationMiddleware(UserUpdatePasswordRequestSchema, 'body');
export const ForgotPasswordValidationMiddleware = validationMiddleware(SendVerificationTokenSchema, 'body');
export const ResetPasswordSchemaValidationMiddleware = validationMiddleware(ResetPasswordSchema, 'body');
export const ResetPasswordVerificationSchemaValidationMiddleware = validationMiddleware(ResetPasswordVerificationSchema, 'params');
