import * as z from 'zod';
import { BusinessPhotoSchema } from '../validators/BusinessPhoto';

type BusinessPhotoAttributes = z.infer<typeof BusinessPhotoSchema>;

export interface IBusinessPhotoAttributes extends BusinessPhotoAttributes {}
