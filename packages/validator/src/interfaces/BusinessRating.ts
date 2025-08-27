import type * as z from 'zod';

import { type BusinessRatingSchema } from '../validators/BusinessRating';

type BusinessRatingAttributes = z.infer<typeof BusinessRatingSchema>;

export interface IBusinessRatingAttributes extends BusinessRatingAttributes {}
