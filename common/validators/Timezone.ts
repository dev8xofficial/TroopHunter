import Joi from 'joi';
import { ITimezoneResponseAttributes } from '../interfaces/Timezone';
import { TimezoneMessageKey, getTimezoneMessage } from '../../backend/src/messages/Timezone';

export const TimezoneSchema = Joi.object<ITimezoneResponseAttributes>({
  id: Joi.string().guid().required(),
  timezoneName: Joi.string().required(),
  utcOffset: Joi.string().required(),
  dst: Joi.boolean().required(),
  dstOffset: Joi.string().required(),
  countryCode: Joi.string().required(),
});

export const TimezoneCreateRequestSchema = TimezoneSchema.keys({
  id: Joi.optional(),
});

export const createTimezoneErrorResponse = (error: Joi.ValidationError) => {
  const errorResponse: any = {};

  error.details.forEach((errorDetail) => {
    switch (errorDetail.context?.key) {
      case 'id':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.INVALID_TIMEZONE_ID).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.INVALID_TIMEZONE_ID).code;
            break;
        }
        break;
      case 'timezoneName':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.INVALID_TIMEZONE_NAME).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.INVALID_TIMEZONE_NAME).code;
            break;
          case 'any.required':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.MISSING_TIMEZONE_NAME).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.MISSING_TIMEZONE_NAME).code;
            break;
        }
        break;
      case 'utcOffset':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.INVALID_UTC_OFFSET).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.INVALID_UTC_OFFSET).code;
            break;
          case 'any.required':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.MISSING_UTC_OFFSET).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.MISSING_UTC_OFFSET).code;
            break;
        }
        break;
      case 'dst':
        switch (errorDetail.type) {
          case 'boolean.base':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.INVALID_DST).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.INVALID_DST).code;
            break;
          case 'any.required':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.MISSING_DST).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.MISSING_DST).code;
            break;
        }
        break;
      case 'dstOffset':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.INVALID_DST_OFFSET).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.INVALID_DST_OFFSET).code;
            break;
          case 'any.required':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.MISSING_DST_OFFSET).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.MISSING_DST_OFFSET).code;
            break;
        }
        break;
      case 'countryCode':
        switch (errorDetail.type) {
          case 'string.base':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.INVALID_COUNTRY_CODE).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.INVALID_COUNTRY_CODE).code;
            break;
          case 'any.required':
            errorResponse.error = getTimezoneMessage(TimezoneMessageKey.MISSING_COUNTRY_CODE).message;
            errorResponse.status = getTimezoneMessage(TimezoneMessageKey.MISSING_COUNTRY_CODE).code;
            break;
        }
        break;
      default:
        break;
    }
  });
  return errorResponse;
};
