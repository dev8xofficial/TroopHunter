import { z } from 'zod';

export const GeoPointSchema = z
  .object({
    type: z.string().nonempty(),
    coordinates: z.array(z.number()),
  })
  .strict();
