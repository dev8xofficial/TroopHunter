import { z } from 'zod';

export const BusinessSourceSchema = z.object({
  id: z.string().uuid(),
  sourceName: z.string(),
});
