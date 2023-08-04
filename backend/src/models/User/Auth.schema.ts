import Joi from 'joi';
import { UserAttributes } from './User.interface';
import { AuthMessageKey, getAuthMessage } from './Auth.messages';

export const AuthSchema = Joi.object<UserAttributes>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const createAuthErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'email':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getAuthMessage(AuthMessageKey.MISSING_AUTH_EMAIL).message;
            errorResponse.status = getAuthMessage(AuthMessageKey.MISSING_AUTH_EMAIL).code;
            break;
          case 'string.empty':
            errorResponse.error = getAuthMessage(AuthMessageKey.MISSING_AUTH_EMAIL).message;
            errorResponse.status = getAuthMessage(AuthMessageKey.MISSING_AUTH_EMAIL).code;
            break;
          case 'string.email':
            errorResponse.error = getAuthMessage(AuthMessageKey.INVALID_AUTH_EMAIL).message;
            errorResponse.status = getAuthMessage(AuthMessageKey.INVALID_AUTH_EMAIL).code;
            break;
        }
        break;
      case 'password':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getAuthMessage(AuthMessageKey.MISSING_AUTH_PASSWORD).message;
            errorResponse.status = getAuthMessage(AuthMessageKey.MISSING_AUTH_PASSWORD).code;
            break;
          case 'string.empty':
            errorResponse.error = getAuthMessage(AuthMessageKey.MISSING_AUTH_PASSWORD).message;
            errorResponse.status = getAuthMessage(AuthMessageKey.MISSING_AUTH_PASSWORD).code;
            break;
          case 'string.min':
            errorResponse.error = getAuthMessage(AuthMessageKey.INVALID_AUTH_PASSWORD).message;
            errorResponse.status = getAuthMessage(AuthMessageKey.INVALID_AUTH_PASSWORD).code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
