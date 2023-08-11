import * as z from 'zod';
import { PostalCodeSchema } from '../validators/PostalCode';

type PostalCodeAttributes = z.infer<typeof PostalCodeSchema>;

export interface IPostalCodeAttributes extends PostalCodeAttributes {}
