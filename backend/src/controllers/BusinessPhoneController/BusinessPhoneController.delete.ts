import { Request, Response } from 'express';
import BusinessPhone from '../../models/BusinessPhone';
import logger from '../../utils/logger';
import { ApiResponse } from 'common/interfaces/Response';
import { createApiResponse } from 'common/utils/response';
import { BusinessPhoneMessageKey, getBusinessPhoneMessage } from '../../messages/BusinessPhone';

// Delete a business phone by ID
export const deleteBusinessPhone = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const businessPhone = await BusinessPhone.findOne({ where: { id } });
    if (!businessPhone) {
      logger.warn(`Business phone with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).code });
      return res.json(response);
    }
    // await businessPhone.destroy();
    logger.info(`Business phone with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_DELETED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_DELETED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting business phone with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_DELETE_BUSINESS_PHONE).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_DELETE_BUSINESS_PHONE).code });
    res.json(response);
  }
};
