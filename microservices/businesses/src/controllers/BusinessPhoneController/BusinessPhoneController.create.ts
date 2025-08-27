import { BusinessPhoneMessageKey, getBusinessPhoneMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, type IBusinessPhoneAttributes, createApiResponse } from '@repo/validator';
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { BusinessPhone } from '../../models';

// Create a new business phone
export const createBusinessPhone = async (req: Request, res: Response): Promise<Response> => {
  const { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid } = req.body as IBusinessPhoneAttributes;

  try {
    const requestData: IBusinessPhoneAttributes = { id: uuidv4(), countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid };
    const newBusinessPhone = await BusinessPhone.create(requestData);

    logger.info(`Business phone created successfully with ID ${newBusinessPhone.id}`);
    const response: ApiResponse<BusinessPhone> = createApiResponse({ success: true, data: newBusinessPhone, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_CREATED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_CREATED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while creating business phone:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_CREATE_BUSINESS_PHONE).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_CREATE_BUSINESS_PHONE).code });
    return res.json(response);
  }
};
