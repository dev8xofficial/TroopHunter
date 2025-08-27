import type * as z from 'zod';

import { type BusinessCategorySchema } from '../validators/BusinessCategory';

type BusinessCategoryAttributes = z.infer<typeof BusinessCategorySchema>;

export interface IBusinessCategoryAttributes extends BusinessCategoryAttributes {}
