import * as z from 'zod';
import { UserSchema, LoginRequestSchema, RefreshTokenSchema, UserFetchRequestSchema, UserFetchByIdRequestSchema, UserCreateRequestSchema, UserUpdateNameRequestSchema, UserUpdatePasswordRequestSchema, UserTokenRequestSchema } from '../validators/User';

type UserSchema = z.infer<typeof UserSchema>;
type LoginRequestAttributes = z.infer<typeof LoginRequestSchema>;
type RefreshTokenAttributes = z.infer<typeof RefreshTokenSchema>;
type UserFetchRequestAttributes = z.infer<typeof UserFetchRequestSchema>;
type UserFetchByIdRequestAttributes = z.infer<typeof UserFetchByIdRequestSchema>;
type UserCreateRequestAttributes = z.infer<typeof UserCreateRequestSchema>;
type UserUpdateNameRequestAttributes = z.infer<typeof UserUpdateNameRequestSchema>;
type UserUpdatePasswordRequestAttributes = z.infer<typeof UserUpdatePasswordRequestSchema>;
type UserTokenRequestAttributes = z.infer<typeof UserTokenRequestSchema>;

export interface IUserAttributes extends UserSchema {}
export interface ILoginRequestAttributes extends LoginRequestAttributes {}
export interface IRefreshTokenAttributes extends RefreshTokenAttributes {}
export interface IUserFetchRequestAttributes extends UserFetchRequestAttributes {}
export interface IUserFetchByIdRequestAttributes extends UserFetchByIdRequestAttributes {}
export interface IUserCreateRequestAttributes extends UserCreateRequestAttributes {}
export interface IUserUpdateNameRequestAttributes extends UserUpdateNameRequestAttributes {}
export interface IUserUpdatePasswordRequestAttributes extends UserUpdatePasswordRequestAttributes {}
export interface IUserTokenRequestAttributes extends UserTokenRequestAttributes {}
