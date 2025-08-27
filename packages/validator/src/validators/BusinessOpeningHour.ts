import { z } from 'zod';

export const BusinessOpeningHourSchema = z.object({
  id: z.string().uuid(),
  businessId: z.string().uuid(),
  openingHourId: z.string().uuid(),
});
