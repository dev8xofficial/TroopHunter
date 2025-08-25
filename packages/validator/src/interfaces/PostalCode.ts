import type * as z from 'zod';

import { type PostalCodeSchema } from '../validators/PostalCode';

type PostalCodeAttributes = z.infer<typeof PostalCodeSchema>;

export interface IPostalCodeAttributes extends PostalCodeAttributes {}
