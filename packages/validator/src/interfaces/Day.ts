import type * as z from 'zod';

import { type DaySchema, type DayCreateRequestSchema } from '../validators/Day';

type Day = z.infer<typeof DaySchema>;
type DayCreateRequestAttributes = z.infer<typeof DayCreateRequestSchema>;

export interface IDayAttributes extends Day {}
export interface IDayCreateRequestAttributes extends DayCreateRequestAttributes {}
