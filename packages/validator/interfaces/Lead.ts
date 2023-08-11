import * as z from 'zod';
import { LeadSchema, LeadFetchRequestSchema, LeadFetchByIdRequestSchema, LeadCreateRequestSchema, LeadUpdateRequestSchema, LeadBuldDeleteRequestSchema } from '../validators/Lead';

type Lead = z.infer<typeof LeadSchema>;
type LeadFetchRequestAttributes = z.infer<typeof LeadFetchRequestSchema>;
type LeadFetchByIdRequestAttributes = z.infer<typeof LeadFetchByIdRequestSchema>;
type LeadCreateRequestAttributes = z.infer<typeof LeadCreateRequestSchema>;
type LeadUpdateRequestAttributes = z.infer<typeof LeadUpdateRequestSchema>;
type LeadBuldDeleteRequestAttributes = z.infer<typeof LeadBuldDeleteRequestSchema>;

export interface ILeadAttributes extends Lead {}
export interface ILeadFetchRequestAttributes extends LeadFetchRequestAttributes {}
export interface ILeadFetchByIdRequestAttributes extends LeadFetchByIdRequestAttributes {}
export interface ILeadCreateRequestAttributes extends LeadCreateRequestAttributes {}
export interface ILeadUpdateRequestAttributes extends LeadUpdateRequestAttributes {}
export interface ILeadBuldDeleteRequestAttributes extends LeadBuldDeleteRequestAttributes {}
