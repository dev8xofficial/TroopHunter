import * as z from 'zod';
import { BusinessSocialMediaSchema } from '../validators/BusinessSocialMedia';

type BusinessSocialMediaAttributes = z.infer<typeof BusinessSocialMediaSchema>;

export interface IBusinessSocialMediaAttributes extends BusinessSocialMediaAttributes {}
