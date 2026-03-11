import { z } from 'zod';

/**
 * Shared Zod schemas for API responses and form validation.
 * Each feature can extend these with domain-specific schemas.
 */

// ─── Common API Response Schemas ───

export const ApiSuccessSchema = z.object({
  status: z.literal('ok'),
  message: z.string().optional()
});

export const ApiErrorSchema = z.object({
  status: z.literal('error'),
  message: z.string(),
  code: z.string().optional()
});

export const PaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    hasMore: z.boolean()
  });

export const HealthCheckSchema = z.object({
  status: z.string(),
  service: z.string(),
  timestamp: z.string()
});

// ─── Common Form Schemas ───

export const EmailSchema = z.string().email('Please enter a valid email address');

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: EmailSchema,
  message: z.string().min(10, 'Message must be at least 10 characters'),
  company: z.string().optional()
});

// ─── Type Exports ───

export type ApiSuccess = z.infer<typeof ApiSuccessSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type HealthCheck = z.infer<typeof HealthCheckSchema>;
export type ContactForm = z.infer<typeof ContactFormSchema>;
