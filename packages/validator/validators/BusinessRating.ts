import { z } from 'zod';

export const BusinessRatingSchema = z.object({
  id: z.string().uuid(),
  ratingValue: z.number(),
  description: z.string().optional(),
});
