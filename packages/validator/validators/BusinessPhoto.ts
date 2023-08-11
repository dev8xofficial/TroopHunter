import { z } from 'zod';

export const BusinessPhotoSchema = z.object({
  id: z.string().uuid(),
  businessId: z.string().uuid(),
  photoUrl: z.string(),
  description: z.string(),
});
