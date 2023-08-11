import { z } from 'zod';

export const BusinessClosingHourSchema = z.object({
  id: z.string().uuid(),
  time: z.string().optional(),
});
