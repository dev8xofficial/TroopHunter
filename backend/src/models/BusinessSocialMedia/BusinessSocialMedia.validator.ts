import Joi from 'joi';
import { IBusinessSocialMediaResponseAttributes } from './BusinessSocialMedia.interface';

export const BusinessSocialMediaSchema = Joi.object<IBusinessSocialMediaResponseAttributes>({
  id: Joi.string(),
  businessId: Joi.string().uuid().required(),
  facebookProfile: Joi.string().allow(null).optional(),
  twitterProfile: Joi.string().allow(null).optional(),
  instagramProfile: Joi.string().allow(null).optional(),
  linkedInProfile: Joi.string().allow(null).optional(),
  youTubeProfile: Joi.string().allow(null).optional(),
});
