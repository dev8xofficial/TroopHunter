import { z } from 'zod';

export const PostalCodeSchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
});
