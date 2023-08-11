import * as z from 'zod';
import { BusinessPhoneSchema, BusinessPhoneFetchRequestSchema, BusinessPhoneFetchByIdRequestSchema, BusinessPhoneCreateRequestSchema, BusinessPhoneUpdateRequestSchema } from '../validators/BusinessPhone';

type BusinessPhone = z.infer<typeof BusinessPhoneSchema>;
type BusinessPhoneFetchRequestAttributes = z.infer<typeof BusinessPhoneFetchRequestSchema>;
type BusinessPhoneFetchByIdRequestAttributes = z.infer<typeof BusinessPhoneFetchByIdRequestSchema>;
type BusinessPhoneCreateRequestAttributes = z.infer<typeof BusinessPhoneCreateRequestSchema>;
type BusinessPhoneUpdateRequestAttributes = z.infer<typeof BusinessPhoneUpdateRequestSchema>;

export interface IBusinessPhoneAttributes extends BusinessPhone {}
export interface IBusinessPhoneFetchRequestAttributes extends BusinessPhoneFetchRequestAttributes {}
export interface IBusinessPhoneFetchByIdRequestAttributes extends BusinessPhoneFetchByIdRequestAttributes {}
export interface IBusinessPhoneCreateRequestAttributes extends BusinessPhoneCreateRequestAttributes {}
export interface IBusinessPhoneUpdateRequestAttributes extends BusinessPhoneUpdateRequestAttributes {}
