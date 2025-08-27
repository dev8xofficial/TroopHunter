import type * as z from 'zod';

import { type BusinessSchema, type BusinessCreateRequestSchema, type BusinessFetchRequestSchema, type BusinessUpdateRequestSchema, type BusinessFetchByIdRequestSchema, type BusinessFetchRequestForLeadSchema } from '../validators/Business';

type Business = z.infer<typeof BusinessSchema>;
type BusinessFetchRequestAttributes = z.infer<typeof BusinessFetchRequestSchema>;
type BusinessFetchForLeadRequestAttributes = z.infer<typeof BusinessFetchRequestForLeadSchema>;
type BusinessFetchByIdRequestAttributes = z.infer<typeof BusinessFetchByIdRequestSchema>;
type BusinessCreateRequestAttributes = z.infer<typeof BusinessCreateRequestSchema>;
type BusinessUpdateRequestAttributes = z.infer<typeof BusinessUpdateRequestSchema>;

export interface IBusinessAttributes extends Business {}
export interface IBusinessFetchRequestAttributes extends BusinessFetchRequestAttributes {}
export interface IBusinessFetchForLeadRequestAttributes extends BusinessFetchForLeadRequestAttributes {}
export interface IBusinessFetchByIdRequestAttributes extends BusinessFetchByIdRequestAttributes {}
export interface IBusinessCreateRequestAttributes extends BusinessCreateRequestAttributes {}
export interface IBusinessUpdateRequestAttributes extends BusinessUpdateRequestAttributes {}
