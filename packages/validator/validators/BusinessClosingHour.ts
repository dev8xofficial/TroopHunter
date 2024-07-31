import { z } from 'zod';

export const BusinessClosingHourSchema = z.object({
  id: z.string().uuid(),
  businessId: z.string().uuid(),
  closingHourId: z.string().uuid(),
});
