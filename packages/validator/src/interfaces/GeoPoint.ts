import type * as z from 'zod';

import { type GeoPointSchema } from '../validators/GeoPoint';

type GeoPointAttributes = z.infer<typeof GeoPointSchema>;

export interface IGeoPointAttributes extends GeoPointAttributes {}
