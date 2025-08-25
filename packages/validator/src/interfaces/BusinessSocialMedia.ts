import type * as z from 'zod';

import { type BusinessSocialMediaSchema } from '../validators/BusinessSocialMedia';

type BusinessSocialMediaAttributes = z.infer<typeof BusinessSocialMediaSchema>;

export interface IBusinessSocialMediaAttributes extends BusinessSocialMediaAttributes {}
