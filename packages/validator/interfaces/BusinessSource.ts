import * as z from 'zod';
import { BusinessSourceSchema } from '../validators/BusinessSource';

type BusinessSourceAttributes = z.infer<typeof BusinessSourceSchema>;

export interface IBusinessSourceAttributes extends BusinessSourceAttributes {}
