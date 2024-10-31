import type * as z from 'zod';

import { type ClosingHourSchema, type ClosingHourCreateRequestSchema } from '../validators/ClosingHour';

type ClosingHour = z.infer<typeof ClosingHourSchema>;
type ClosingHourCreateRequestAttributes = z.infer<typeof ClosingHourCreateRequestSchema>;

export interface IClosingHourAttributes extends ClosingHour {}
export interface IClosingHourCreateRequestAttributes extends ClosingHourCreateRequestAttributes {}
