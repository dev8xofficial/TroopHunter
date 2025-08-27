import { BusinessMessageKey, getBusinessMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IBusinessFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { Business } from '../../models';

export const deleteBusiness = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IBusinessFetchByIdRequestAttributes;

  try {
    const business = await Business.findByPk(id);
    if (business == null) {
      logger.warn(`Business with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).code });
      return res.json(response);
    }

    await business.destroy();
    logger.info(`Business with ID ${id} deleted successfully.`);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getBusinessMessage(BusinessMessageKey.BUSINESS_DELETED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_DELETED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error deleting business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_DELETE_BUSINESS).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_DELETE_BUSINESS).code });
    return res.json(response);
  }
};
