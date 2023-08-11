import { z } from 'zod';

export const BusinessOpeningHourSchema = z.object({
  id: z.string().uuid(),
  time: z.string().optional(),
});
