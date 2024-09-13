import * as z from 'zod';
import { UserSchema, SendVerificationTokenSchema, VerifyUserSchema, LoginRequestSchema, RefreshTokenSchema, UserFetchRequestSchema, UserFetchByIdRequestSchema, UserCreateRequestSchema, UserUpdateNameRequestSchema, UserUpdatePasswordRequestSchema, UserTokenRequestSchema, ResetPasswordSchema, ResetPasswordVerificationSchema } from '../validators/User';

type UserSchema = z.infer<typeof UserSchema>;
type SendVerificationTokenAttributes = z.infer<typeof SendVerificationTokenSchema>;
type VerifyUserAttributes = z.infer<typeof VerifyUserSchema>;
type LoginRequestAttributes = z.infer<typeof LoginRequestSchema>;
type RefreshTokenAttributes = z.infer<typeof RefreshTokenSchema>;
type UserFetchRequestAttributes = z.infer<typeof UserFetchRequestSchema>;
type UserFetchByIdRequestAttributes = z.infer<typeof UserFetchByIdRequestSchema>;
type UserCreateRequestAttributes = z.infer<typeof UserCreateRequestSchema>;
type UserUpdateNameRequestAttributes = z.infer<typeof UserUpdateNameRequestSchema>;
type UserUpdatePasswordRequestAttributes = z.infer<typeof UserUpdatePasswordRequestSchema>;
type UserTokenRequestAttributes = z.infer<typeof UserTokenRequestSchema>;
type ForgotPasswordAttributes = z.infer<typeof SendVerificationTokenSchema>;
type ResetPasswordAttributes = z.infer<typeof ResetPasswordSchema>;
type ResetPasswordVerificationAttributes = z.infer<typeof ResetPasswordVerificationSchema>;

export interface IUserAttributes extends UserSchema {}
export interface ISendVerificationTokenAttributes extends SendVerificationTokenAttributes {}
export interface IVerifyUserAttributes extends VerifyUserAttributes {}
export interface ILoginRequestAttributes extends LoginRequestAttributes {}
export interface IRefreshTokenAttributes extends RefreshTokenAttributes {}
export interface IUserFetchRequestAttributes extends UserFetchRequestAttributes {}
export interface IUserFetchByIdRequestAttributes extends UserFetchByIdRequestAttributes {}
export interface IUserCreateRequestAttributes extends UserCreateRequestAttributes {}
export interface IUserUpdateNameRequestAttributes extends UserUpdateNameRequestAttributes {}
export interface IUserUpdatePasswordRequestAttributes extends UserUpdatePasswordRequestAttributes {}
export interface IUserTokenRequestAttributes extends UserTokenRequestAttributes {}
export interface IForgotPasswordAttributes extends ForgotPasswordAttributes {}
export interface IResetPasswordAttributes extends ResetPasswordAttributes {}
export interface IResetPasswordVerificationAttributes extends ResetPasswordVerificationAttributes {}
