import Joi from 'joi';
import { RequestMessageKey, getRequestMessage } from '../messages/Request.messages';

export interface RequestAttributes {
  page: string;
  limit: string;
}

export const RequestSchema = Joi.object<RequestAttributes>({
  page: Joi.string().required(),
  limit: Joi.string().required(),
});

export const createRequestErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'page':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getRequestMessage(RequestMessageKey.MISSING_REQUEST_PAGE).message;
            errorResponse.status = getRequestMessage(RequestMessageKey.MISSING_REQUEST_PAGE).code;
            break;
          case 'string.empty':
            errorResponse.error = getRequestMessage(RequestMessageKey.MISSING_REQUEST_PAGE).message;
            errorResponse.status = getRequestMessage(RequestMessageKey.MISSING_REQUEST_PAGE).code;
          case 'string.base':
            errorResponse.error = getRequestMessage(RequestMessageKey.INVALID_REQUEST_PAGE).message;
            errorResponse.status = getRequestMessage(RequestMessageKey.INVALID_REQUEST_PAGE).code;
            break;
        }
        break;
      case 'limit':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).message;
            errorResponse.status = getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).code;
            break;
          case 'string.empty':
            errorResponse.error = getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).message;
            errorResponse.status = getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).code;
          case 'string.base':
            errorResponse.error = getRequestMessage(RequestMessageKey.INVALID_REQUEST_LIMIT).message;
            errorResponse.status = getRequestMessage(RequestMessageKey.INVALID_REQUEST_LIMIT).code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
