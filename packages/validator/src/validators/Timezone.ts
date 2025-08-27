import { z } from 'zod';

export const TimezoneSchema = z.object({
  id: z.string().uuid(),
  timezoneName: z.string(),
  utcOffset: z.string(),
  dst: z.boolean(),
  dstOffset: z.string(),
  countryCode: z.string(),
});

export const TimezoneCreateRequestSchema = TimezoneSchema.omit({ id: true });
