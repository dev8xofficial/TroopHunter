import { z } from 'zod';

import validationMiddleware from '../middleware/validationMiddleware';

export const LeadBusinessSchema = z.object({
  leadId: z.string().uuid(),
  businessId: z.string().uuid(),
});

export const LeadBusinessFetchRequestSchema = LeadBusinessSchema.omit({ leadId: true }).partial();

export const LeadBusinessFetchByIdRequestSchema = LeadBusinessSchema.pick({ leadId: true });

export const LeadBusinessCreateRequestSchema = LeadBusinessSchema.omit({ leadId: true });

export const LeadBusinessUpdateRequestSchema = LeadBusinessSchema.omit({ leadId: true }).partial();

export const LeadBusinessFetchRequestValidationMiddleware = validationMiddleware(LeadBusinessFetchRequestSchema, 'query');
export const LeadBusinessFetchByIdRequestValidationMiddleware = validationMiddleware(LeadBusinessFetchByIdRequestSchema, 'params');
export const LeadBusinessCreateRequestValidationMiddleware = validationMiddleware(LeadBusinessCreateRequestSchema, 'body');
export const LeadBusinessUpdateRequestValidationMiddleware = validationMiddleware(LeadBusinessUpdateRequestSchema, 'body');
