import Joi from 'joi';
import { IUserResponseAttributes } from './User.interface';
import { UserMessageKey, getUserMessage } from './User.messages';

export const UserSchema = Joi.object<IUserResponseAttributes>({
  id: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  role: Joi.string().valid('guest', 'user', 'admin').optional(),
});

export const createUserErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getUserMessage(UserMessageKey.INVALID_USER_ID).message;
            errorResponse.status = getUserMessage(UserMessageKey.INVALID_USER_ID).code;
            break;
        }
        break;
      case 'firstName':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getUserMessage(UserMessageKey.MISSING_FIRST_NAME).message;
            errorResponse.status = getUserMessage(UserMessageKey.MISSING_FIRST_NAME).code;
            break;
          case 'string.empty':
            errorResponse.error = getUserMessage(UserMessageKey.MISSING_FIRST_NAME).message;
            errorResponse.status = getUserMessage(UserMessageKey.MISSING_FIRST_NAME).code;
            break;
          case 'string.base':
            errorResponse.error = getUserMessage(UserMessageKey.INVALID_FIRST_NAME).message;
            errorResponse.status = getUserMessage(UserMessageKey.INVALID_FIRST_NAME).code;
            break;
        }
        break;
      case 'lastName':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getUserMessage(UserMessageKey.MISSING_LAST_NAME).message;
            errorResponse.status = getUserMessage(UserMessageKey.MISSING_LAST_NAME).code;
            break;
          case 'string.empty':
            errorResponse.error = getUserMessage(UserMessageKey.MISSING_LAST_NAME).message;
            errorResponse.status = getUserMessage(UserMessageKey.MISSING_LAST_NAME).code;
            break;
          case 'string.base':
            errorResponse.error = getUserMessage(UserMessageKey.INVALID_LAST_NAME).message;
            errorResponse.status = getUserMessage(UserMessageKey.INVALID_LAST_NAME).code;
            break;
        }
        break;
      case 'email':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getUserMessage(UserMessageKey.MISSING_EMAIL).message;
            errorResponse.status = getUserMessage(UserMessageKey.MISSING_EMAIL).code;
            break;
          case 'string.empty':
            errorResponse.error = getUserMessage(UserMessageKey.MISSING_EMAIL).message;
            errorResponse.status = getUserMessage(UserMessageKey.MISSING_EMAIL).code;
            break;
          case 'string.email':
            errorResponse.error = getUserMessage(UserMessageKey.INVALID_EMAIL).message;
            errorResponse.status = getUserMessage(UserMessageKey.INVALID_EMAIL).code;
            break;
        }
        break;
      case 'password':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getUserMessage(UserMessageKey.MISSING_PASSWORD).message;
            errorResponse.status = getUserMessage(UserMessageKey.MISSING_PASSWORD).code;
            break;
          case 'string.empty':
            errorResponse.error = getUserMessage(UserMessageKey.MISSING_PASSWORD).message;
            errorResponse.status = getUserMessage(UserMessageKey.MISSING_PASSWORD).code;
            break;
          case 'string.min':
            errorResponse.error = getUserMessage(UserMessageKey.INVALID_PASSWORD).message;
            errorResponse.status = getUserMessage(UserMessageKey.INVALID_PASSWORD).code;
            break;
        }
        break;
      case 'role':
        switch (errorDetail.type) {
          case 'string.valid':
            errorResponse.error = getUserMessage(UserMessageKey.INVALID_ROLE).message;
            errorResponse.status = getUserMessage(UserMessageKey.INVALID_ROLE).code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
