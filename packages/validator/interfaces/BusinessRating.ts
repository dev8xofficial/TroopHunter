import * as z from 'zod';
import { BusinessRatingSchema } from '../validators/BusinessRating';

type BusinessRatingAttributes = z.infer<typeof BusinessRatingSchema>;

export interface IBusinessRatingAttributes extends BusinessRatingAttributes {}
