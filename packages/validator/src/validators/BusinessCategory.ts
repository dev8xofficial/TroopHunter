import { z } from 'zod';

export const BusinessCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
