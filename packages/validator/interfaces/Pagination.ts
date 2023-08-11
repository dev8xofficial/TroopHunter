import * as z from 'zod';
import { PaginationSchema } from '../validators/Pagination';

type PaginationAttributes = z.infer<typeof PaginationSchema>;

export interface IPaginationAttributes extends PaginationAttributes {}
