import type * as z from 'zod';

import { type LeadBusinessSchema, type LeadBusinessFetchRequestSchema, type LeadBusinessFetchByIdRequestSchema, type LeadBusinessCreateRequestSchema, type LeadBusinessUpdateRequestSchema } from '../validators/LeadBusiness';

type LeadBusiness = z.infer<typeof LeadBusinessSchema>;
type LeadBusinessFetchRequestAttributes = z.infer<typeof LeadBusinessFetchRequestSchema>;
type LeadBusinessFetchByIdRequestAttributes = z.infer<typeof LeadBusinessFetchByIdRequestSchema>;
type LeadBusinessCreateRequestAttributes = z.infer<typeof LeadBusinessCreateRequestSchema>;
type LeadBusinessUpdateRequestAttributes = z.infer<typeof LeadBusinessUpdateRequestSchema>;

export interface ILeadBusinessAttributes extends LeadBusiness {}
export interface ILeadBusinessFetchRequestAttributes extends LeadBusinessFetchRequestAttributes {}
export interface ILeadBusinessFetchByIdRequestAttributes extends LeadBusinessFetchByIdRequestAttributes {}
export interface ILeadBusinessCreateRequestAttributes extends LeadBusinessCreateRequestAttributes {}
export interface ILeadBusinessUpdateRequestAttributes extends LeadBusinessUpdateRequestAttributes {}
