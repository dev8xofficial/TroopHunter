import { Request, Response } from 'express';
import BusinessPhone from '../../models/BusinessPhone/BusinessPhone.model';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { createApiResponse } from '../../utils/response';
import { BusinessPhoneMessageKey, getBusinessPhoneMessage } from '../../models/BusinessPhone/BusinessPhone.messages';
import { IBusinessPhoneRequestAttributes } from '../../models/BusinessPhone/BusinessPhone.interface';

// Update a business phone by ID
export const updateBusinessPhone = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid }: IBusinessPhoneRequestAttributes = req.body;
  try {
    const existingBusinessPhone = await BusinessPhone.findOne({ where: { id } });
    if (!existingBusinessPhone) {
      logger.warn(`Business phone with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).code });
      return res.json(response);
    }
    await existingBusinessPhone.update({ countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid });
    logger.info(`Business phone with ID ${id} updated successfully`);
    const response: ApiResponse<BusinessPhone> = createApiResponse({ success: true, data: existingBusinessPhone, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_UPDATED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_UPDATED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating business phone with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_UPDATE_BUSINESS_PHONE).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_UPDATE_BUSINESS_PHONE).code });
    res.json(response);
  }
};
