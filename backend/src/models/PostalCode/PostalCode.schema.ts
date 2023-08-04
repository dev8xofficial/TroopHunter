import Joi from 'joi';
import { PostalCodeAttributes } from './PostalCode.interface';
import { PostalCodeMessageKey, getPostalCodeMessage } from './PostalCode.messages';

export const PostalCodeSchema = Joi.object<PostalCodeAttributes>({
  id: Joi.string(),
  code: Joi.string().required(),
});

export const createCountryErrorResponse = (error: Joi.ValidationError) => {
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
