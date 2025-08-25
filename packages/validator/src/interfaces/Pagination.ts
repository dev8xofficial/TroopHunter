import type * as z from 'zod';

import { type PaginationSchema } from '../validators/Pagination';

type PaginationAttributes = z.infer<typeof PaginationSchema>;

export interface IPaginationAttributes extends PaginationAttributes {}
