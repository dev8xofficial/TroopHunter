import * as z from 'zod';
import { GeoPointSchema } from '../validators/GeoPoint';

type GeoPointAttributes = z.infer<typeof GeoPointSchema>;

export interface IGeoPointAttributes extends GeoPointAttributes {}
