import Joi from 'joi';
import { BusinessPhotoAttributes } from './BusinessPhoto.interface';

export const BusinessPhotoSchema = Joi.object<BusinessPhotoAttributes>({
  id: Joi.string(),
  businessId: Joi.string().uuid().required(),
  photoUrl: Joi.string().required(),
  description: Joi.string().required(),
});
