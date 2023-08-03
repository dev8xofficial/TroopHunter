import Joi from 'joi';
import { LeadBusinessAttributes } from './LeadBusiness.interface';

export const LeadBusinessSchema = Joi.object<LeadBusinessAttributes>({
  leadId: Joi.string().required(),
  businessId: Joi.string().required(),
});
