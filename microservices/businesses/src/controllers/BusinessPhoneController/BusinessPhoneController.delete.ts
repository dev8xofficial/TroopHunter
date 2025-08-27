import { BusinessPhoneMessageKey, getBusinessPhoneMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IBusinessPhoneFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { BusinessPhone } from '../../models';

// Delete a business phone by ID
export const deleteBusinessPhone = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IBusinessPhoneFetchByIdRequestAttributes;
  try {
    const businessPhone = await BusinessPhone.findOne({ where: { id } });
    if (businessPhone == null) {
      logger.warn(`Business phone with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).code });
      return res.json(response);
    }
    // await businessPhone.destroy();
    logger.info(`Business phone with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_DELETED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_DELETED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while deleting business phone with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_DELETE_BUSINESS_PHONE).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_DELETE_BUSINESS_PHONE).code });
    return res.json(response);
  }
};
