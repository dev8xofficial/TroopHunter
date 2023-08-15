import * as z from 'zod';
import { UserSchema, LoginRequestSchema, UserFetchRequestSchema, UserFetchByIdRequestSchema, UserCreateRequestSchema, UserUpdateNameRequestSchema, UserUpdatePasswordRequestSchema } from '../validators/User';

type UserSchema = z.infer<typeof UserSchema>;
type LoginRequestAttributes = z.infer<typeof LoginRequestSchema>;
type UserFetchRequestAttributes = z.infer<typeof UserFetchRequestSchema>;
type UserFetchByIdRequestAttributes = z.infer<typeof UserFetchByIdRequestSchema>;
type UserCreateRequestAttributes = z.infer<typeof UserCreateRequestSchema>;
type UserUpdateNameRequestAttributes = z.infer<typeof UserUpdateNameRequestSchema>;
type UserUpdatePasswordRequestAttributes = z.infer<typeof UserUpdatePasswordRequestSchema>;

export interface IUserAttributes extends UserSchema {}
export interface ILoginRequestAttributes extends LoginRequestAttributes {}
export interface IUserFetchRequestAttributes extends UserFetchRequestAttributes {}
export interface IUserFetchByIdRequestAttributes extends UserFetchByIdRequestAttributes {}
export interface IUserCreateRequestAttributes extends UserCreateRequestAttributes {}
export interface IUserUpdateNameRequestAttributes extends UserUpdateNameRequestAttributes {}
export interface IUserUpdatePasswordRequestAttributes extends UserUpdatePasswordRequestAttributes {}
