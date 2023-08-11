import * as z from 'zod';
import { UserSchema, UserFetchRequestSchema, UserFetchByIdRequestSchema, UserCreateRequestSchema, UserUpdateRequestSchema } from '../validators/User';

type UserSchema = z.infer<typeof UserSchema>;
type UserFetchRequestAttributes = z.infer<typeof UserFetchRequestSchema>;
type UserFetchByIdRequestAttributes = z.infer<typeof UserFetchByIdRequestSchema>;
type UserCreateRequestAttributes = z.infer<typeof UserCreateRequestSchema>;
type UserUpdateRequestAttributes = z.infer<typeof UserUpdateRequestSchema>;

export interface IUserAttributes extends UserSchema {}
export interface IUserFetchRequestAttributes extends UserFetchRequestAttributes {}
export interface IUserFetchByIdRequestAttributes extends UserFetchByIdRequestAttributes {}
export interface IUserCreateRequestAttributes extends UserCreateRequestAttributes {}
export interface IUserUpdateRequestAttributes extends UserUpdateRequestAttributes {}
