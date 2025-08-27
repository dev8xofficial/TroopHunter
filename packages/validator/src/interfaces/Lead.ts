import type * as z from 'zod';

import { type LeadSchema, type LeadFetchRequestSchema, type LeadFetchByIdRequestSchema, type LeadCreateRequestSchema, type LeadUpdateRequestSchema, type LeadBuldDeleteRequestSchema, type LeadsFetchByUserIdRequestSchema } from '../validators/Lead';

type Lead = z.infer<typeof LeadSchema>;
type LeadFetchRequestAttributes = z.infer<typeof LeadFetchRequestSchema>;
type LeadFetchByIdRequestAttributes = z.infer<typeof LeadFetchByIdRequestSchema>;
type LeadsFetchByUserIdRequestAttributes = z.infer<typeof LeadsFetchByUserIdRequestSchema>;
type LeadCreateRequestAttributes = z.infer<typeof LeadCreateRequestSchema>;
type LeadUpdateRequestAttributes = z.infer<typeof LeadUpdateRequestSchema>;
type LeadBuldDeleteRequestAttributes = z.infer<typeof LeadBuldDeleteRequestSchema>;

export interface ILeadAttributes extends Lead {}
export interface ILeadFetchRequestAttributes extends LeadFetchRequestAttributes {}
export interface ILeadFetchByIdRequestAttributes extends LeadFetchByIdRequestAttributes {}
export interface ILeadsFetchByUserIdRequestAttributes extends LeadsFetchByUserIdRequestAttributes {}
export interface ILeadCreateRequestAttributes extends LeadCreateRequestAttributes {}
export interface ILeadUpdateRequestAttributes extends LeadUpdateRequestAttributes {}
export interface ILeadBuldDeleteRequestAttributes extends LeadBuldDeleteRequestAttributes {}
