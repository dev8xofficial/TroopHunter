import Joi from 'joi';
import { IBusinessPhotoResponseAttributes } from './BusinessPhoto.interface';

export const BusinessPhotoSchema = Joi.object<IBusinessPhotoResponseAttributes>({
  id: Joi.string().guid().required(),
  businessId: Joi.string().uuid().required(),
  photoUrl: Joi.string().required(),
  description: Joi.string().required(),
});
