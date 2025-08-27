import type * as z from 'zod';

import { type BusinessPhotoSchema } from '../validators/BusinessPhoto';

type BusinessPhotoAttributes = z.infer<typeof BusinessPhotoSchema>;

export interface IBusinessPhotoAttributes extends BusinessPhotoAttributes {}
