import type * as z from 'zod';

import { type BusinessSourceFetchBySourceNameRequestSchema, type BusinessSourceSchema } from '../validators/BusinessSource';

type BusinessSourceAttributes = z.infer<typeof BusinessSourceSchema>;
type BusinessSourceFetchBySourceNameRequestAttributes = z.infer<typeof BusinessSourceFetchBySourceNameRequestSchema>;

export interface IBusinessSourceAttributes extends BusinessSourceAttributes {}
export interface IBusinessSourceFetchBySourceNameRequestAttributes extends BusinessSourceFetchBySourceNameRequestAttributes {}
