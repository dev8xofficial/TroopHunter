import * as z from 'zod';
import { BusinessDaySchema, BusinessDayCreateRequestSchema } from '../validators/BusinessDay';

type BusinessDay = z.infer<typeof BusinessDaySchema>;
type BusinessDayCreateRequestAttributes = z.infer<typeof BusinessDayCreateRequestSchema>;

export interface IBusinessDayAttributes extends BusinessDay {}
export interface IBusinessDayCreateRequestAttributes extends BusinessDayCreateRequestAttributes {}
