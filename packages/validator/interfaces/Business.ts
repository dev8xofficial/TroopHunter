import * as z from 'zod';
import { BusinessSchema, BusinessCreateRequestSchema, BusinessFetchRequestSchema, BusinessUpdateRequestSchema, BusinessFetchByIdRequestSchema } from '../validators/Business';

type Business = z.infer<typeof BusinessSchema>;
type BusinessFetchRequestAttributes = z.infer<typeof BusinessFetchRequestSchema>;
type BusinessFetchByIdRequestAttributes = z.infer<typeof BusinessFetchByIdRequestSchema>;
type BusinessCreateRequestAttributes = z.infer<typeof BusinessCreateRequestSchema>;
type BusinessUpdateRequestAttributes = z.infer<typeof BusinessUpdateRequestSchema>;

export interface IBusinessAttributes extends Business {}
export interface IBusinessFetchRequestAttributes extends BusinessFetchRequestAttributes {}
export interface IBusinessFetchByIdRequestAttributes extends BusinessFetchByIdRequestAttributes {}
export interface IBusinessCreateRequestAttributes extends BusinessCreateRequestAttributes {}
export interface IBusinessUpdateRequestAttributes extends BusinessUpdateRequestAttributes {}
