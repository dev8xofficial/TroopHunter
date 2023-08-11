import * as z from 'zod';
import { BusinessCategorySchema } from '../validators/BusinessCategory';

type BusinessCategoryAttributes = z.infer<typeof BusinessCategorySchema>;

export interface IBusinessCategoryAttributes extends BusinessCategoryAttributes {}
