import Joi from 'joi';
import { IPostalCodeResponseAttributes } from '../interfaces/PostalCode';
import { PostalCodeMessageKey, getPostalCodeMessage } from '../../backend/src/messages/PostalCode';

export const PostalCodeSchema = Joi.object<IPostalCodeResponseAttributes>({
  id: Joi.string().guid().required(),
  code: Joi.string().required(),
});

export const createPostalCodeErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getPostalCodeMessage(PostalCodeMessageKey.INVALID_POSTAL_CODE_ID).message;
            errorResponse.status = getPostalCodeMessage(PostalCodeMessageKey.INVALID_POSTAL_CODE_ID).code;
            break;
        }
        break;
      case 'code':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getPostalCodeMessage(PostalCodeMessageKey.MISSING_POSTAL_CODE).message;
            errorResponse.status = getPostalCodeMessage(PostalCodeMessageKey.MISSING_POSTAL_CODE).code;
            break;
          case 'string.base':
            errorResponse.error = getPostalCodeMessage(PostalCodeMessageKey.INVALID_POSTAL_CODE).message;
            errorResponse.status = getPostalCodeMessage(PostalCodeMessageKey.INVALID_POSTAL_CODE).code;
            break;
        }
        break;
      default:
        break;
    }
  });

  return errorResponse;
};
