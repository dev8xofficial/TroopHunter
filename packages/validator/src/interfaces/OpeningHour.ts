import type * as z from 'zod';

import { type OpeningHourSchema, type OpeningHourCreateRequestSchema } from '../validators/OpeningHour';

type OpeningHour = z.infer<typeof OpeningHourSchema>;
type OpeningHourCreateRequestAttributes = z.infer<typeof OpeningHourCreateRequestSchema>;

export interface IOpeningHourAttributes extends OpeningHour {}
export interface IOpeningHourCreateRequestAttributes extends OpeningHourCreateRequestAttributes {}
