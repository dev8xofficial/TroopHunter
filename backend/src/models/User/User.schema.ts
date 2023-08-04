import Joi from 'joi';
import { UserAttributes } from './User.interface';
import { getUserMessage } from './User.messages';

export const UserSchema = Joi.object<UserAttributes>({
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
            errorResponse.error = getUserMessage('INVALID_USER_ID').message;
            errorResponse.status = getUserMessage('INVALID_USER_ID').code;
            break;
        }
        break;
      case 'firstName':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getUserMessage('MISSING_FIRST_NAME').message;
            errorResponse.status = getUserMessage('MISSING_FIRST_NAME').code;
            break;
          case 'string.base':
            errorResponse.error = getUserMessage('INVALID_FIRST_NAME').message;
            errorResponse.status = getUserMessage('INVALID_FIRST_NAME').code;
            break;
        }
        break;
      case 'lastName':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getUserMessage('MISSING_LAST_NAME').message;
            errorResponse.status = getUserMessage('MISSING_LAST_NAME').code;
            break;
          case 'string.base':
            errorResponse.error = getUserMessage('INVALID_LAST_NAME').message;
            errorResponse.status = getUserMessage('INVALID_LAST_NAME').code;
            break;
        }
        break;
      case 'email':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getUserMessage('MISSING_EMAIL').message;
            errorResponse.status = getUserMessage('MISSING_EMAIL').code;
            break;
          case 'string.email':
            errorResponse.error = getUserMessage('INVALID_EMAIL').message;
            errorResponse.status = getUserMessage('INVALID_EMAIL').code;
            break;
        }
        break;
      case 'password':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getUserMessage('MISSING_PASSWORD').message;
            errorResponse.status = getUserMessage('MISSING_PASSWORD').code;
            break;
          case 'string.min':
            errorResponse.error = getUserMessage('INVALID_PASSWORD').message;
            errorResponse.status = getUserMessage('INVALID_PASSWORD').code;
            break;
        }
        break;
      case 'role':
        switch (errorDetail.type) {
          case 'string.valid':
            errorResponse.error = getUserMessage('INVALID_ROLE').message;
            errorResponse.status = getUserMessage('INVALID_ROLE').code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
