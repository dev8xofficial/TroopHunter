import Joi from 'joi';
import { StateAttributes } from './State.interface';
import { getStateMessage } from './State.messages';

export const StateSchema = Joi.object<StateAttributes>({
  id: Joi.string(),
  name: Joi.string().required(),
  code: Joi.string().required(),
  countryCode: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
});

export const createStateErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getStateMessage('INVALID_STATE_ID').message;
            errorResponse.status = getStateMessage('INVALID_STATE_ID').code;
            break;
        }
        break;
      case 'name':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getStateMessage('INVALID_STATE_NAME').message;
            errorResponse.status = getStateMessage('INVALID_STATE_NAME').code;
            break;
          case 'any.required':
            errorResponse.error = getStateMessage('MISSING_STATE_NAME').message;
            errorResponse.status = getStateMessage('MISSING_STATE_NAME').code;
            break;
        }
        break;
      case 'code':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getStateMessage('INVALID_STATE_CODE').message;
            errorResponse.status = getStateMessage('INVALID_STATE_CODE').code;
            break;
          case 'any.required':
            errorResponse.error = getStateMessage('MISSING_STATE_CODE').message;
            errorResponse.status = getStateMessage('MISSING_STATE_CODE').code;
            break;
        }
        break;
      case 'countryCode':
        switch (errorDetail.type) {
          case 'any.required':
            errorResponse.error = getStateMessage('MISSING_STATE_COUNTRY_CODE').message;
            errorResponse.status = getStateMessage('MISSING_STATE_COUNTRY_CODE').code;
            break;
          case 'string.base':
            errorResponse.error = getStateMessage('INVALID_STATE_COUNTRY_CODE').message;
            errorResponse.status = getStateMessage('INVALID_STATE_COUNTRY_CODE').code;
            break;
        }
        break;
      case 'longitude':
        switch (errorDetail.type) {
          case 'number.base':
            errorResponse.error = getStateMessage('INVALID_STATE_LONGITUDE').message;
            errorResponse.status = getStateMessage('INVALID_STATE_LONGITUDE').code;
            break;
          case 'any.required':
            errorResponse.error = getStateMessage('MISSING_STATE_LONGITUDE').message;
            errorResponse.status = getStateMessage('MISSING_STATE_LONGITUDE').code;
            break;
        }
        break;
      case 'latitude':
        switch (errorDetail.type) {
          case 'number.base':
            errorResponse.error = getStateMessage('INVALID_STATE_LATITUDE').message;
            errorResponse.status = getStateMessage('INVALID_STATE_LATITUDE').code;
            break;
          case 'any.required':
            errorResponse.error = getStateMessage('MISSING_STATE_LATITUDE').message;
            errorResponse.status = getStateMessage('MISSING_STATE_LATITUDE').code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
