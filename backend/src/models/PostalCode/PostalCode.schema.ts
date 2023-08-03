import Joi from 'joi';
import { PostalCodeAttributes } from './PostalCode.interface';

export const PostalCodeSchema = Joi.object<PostalCodeAttributes>({
  id: Joi.string(),
  code: Joi.string().required(),
});
