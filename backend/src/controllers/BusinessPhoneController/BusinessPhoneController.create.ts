import { Request, Response } from 'express';
import BusinessPhone from '../../models/BusinessPhone';
import logger from '../../utils/logger';
import { ApiResponse } from 'common/interfaces/Response';
import { IBusinessPhoneRequestAttributes, IBusinessPhoneResponseAttributes } from 'common/interfaces/BusinessPhone';
import { createApiResponse } from 'common/utils/response';
import { BusinessPhoneMessageKey, getBusinessPhoneMessage } from '../../messages/BusinessPhone';
import { v4 as uuidv4 } from 'uuid';

// Create a new business phone
export const createBusinessPhone = async (req: Request, res: Response) => {
  const { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid }: IBusinessPhoneRequestAttributes = req.body;

  try {
    const requestData: IBusinessPhoneResponseAttributes = { id: uuidv4(), countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid };
    const newBusinessPhone = await BusinessPhone.create(requestData);

    logger.info(`Business phone created successfully with ID ${newBusinessPhone.id}`);
    const response: ApiResponse<BusinessPhone> = createApiResponse({ success: true, data: newBusinessPhone, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_CREATED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating business phone:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_CREATE_BUSINESS_PHONE).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_CREATE_BUSINESS_PHONE).code });
    res.json(response);
  }
};
