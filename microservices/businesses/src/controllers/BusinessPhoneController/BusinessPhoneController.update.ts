import { BusinessPhoneMessageKey, getBusinessPhoneMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IBusinessPhoneAttributes, type IBusinessPhoneFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { BusinessPhone } from '../../models';

// Update a business phone by ID
export const updateBusinessPhone = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IBusinessPhoneFetchByIdRequestAttributes;
  const { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid } = req.body as IBusinessPhoneAttributes;
  try {
    const existingBusinessPhone = await BusinessPhone.findOne({ where: { id } });
    if (existingBusinessPhone == null) {
      logger.warn(`Business phone with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).code });
      return res.json(response);
    }
    await existingBusinessPhone.update({ countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid });
    logger.info(`Business phone with ID ${id} updated successfully`);
    const response: ApiResponse<BusinessPhone> = createApiResponse({ success: true, data: existingBusinessPhone, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_UPDATED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_UPDATED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while updating business phone with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_UPDATE_BUSINESS_PHONE).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_UPDATE_BUSINESS_PHONE).code });
    return res.json(response);
  }
};
