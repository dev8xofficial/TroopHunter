import { z } from 'zod';
import { BusinessSchema } from './Business';
import validationMiddleware from '../middleware/validationMiddleware';

export const LeadSchema = BusinessSchema.partial().extend({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  businessIds: z.array(z.string().uuid()).optional(),
  title: z.string(),
  search: z.string(),
  phone: z.string().optional(),
  businessCount: z.number(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

export const LeadFetchRequestSchema = LeadSchema.omit({ id: true }).partial();
export const LeadFetchByIdRequestSchema = LeadSchema.pick({ id: true });
export const LeadCreateRequestSchema = LeadSchema.omit({ id: true });
export const LeadUpdateRequestSchema = LeadSchema.omit({ id: true }).partial();
export const LeadBuldDeleteRequestSchema = LeadSchema.extend({ selectedLeadIds: z.array(z.string().uuid()).min(1) }).pick({ selectedLeadIds: true });

export const LeadFetchRequestValidationMiddleware = validationMiddleware(LeadFetchRequestSchema, 'query');
export const LeadFetchByIdRequestValidationMiddleware = validationMiddleware(LeadFetchByIdRequestSchema, 'params');
export const LeadCreateRequestValidationMiddleware = validationMiddleware(LeadCreateRequestSchema, 'body');
export const LeadUpdateRequestValidationMiddleware = validationMiddleware(LeadUpdateRequestSchema, 'body');
export const LeadBulkDeleteRequestValidationMiddleware = validationMiddleware(LeadBuldDeleteRequestSchema, 'body');
