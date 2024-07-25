import * as z from 'zod';
import { TimezoneCreateRequestSchema, TimezoneSchema } from '../validators/Timezone';

type Timezone = z.infer<typeof TimezoneSchema>;
type TimezoneCreateRequestAttributes = z.infer<typeof TimezoneCreateRequestSchema>;

export interface ITimezoneAttributes extends Timezone {}
export interface ITimezoneCreateRequestAttributes extends TimezoneCreateRequestAttributes {}
