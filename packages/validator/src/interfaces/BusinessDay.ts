import type * as z from 'zod';

import { type BusinessDaySchema, type BusinessDayCreateRequestSchema } from '../validators/BusinessDay';

type BusinessDay = z.infer<typeof BusinessDaySchema>;
type BusinessDayCreateRequestAttributes = z.infer<typeof BusinessDayCreateRequestSchema>;

export interface IBusinessDayAttributes extends BusinessDay {}
export interface IBusinessDayCreateRequestAttributes extends BusinessDayCreateRequestAttributes {}
