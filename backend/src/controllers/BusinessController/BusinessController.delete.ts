import { Request, Response } from 'express';
import { ApiResponse } from '../../types/Response.interface';
import Business from '../../models/Business/Business.model';
import logger from '../../utils/logger';
import { createApiResponse } from '../../utils/response';
import { BusinessMessageKey, getBusinessMessage } from '../../models/Business/Business.messages';

export const deleteBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const business = await Business.findByPk(id);
    if (!business) {
      logger.warn(`Business with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).code });
      return res.json(response);
    }

    await business.destroy();
    logger.info(`Business with ID ${id} deleted successfully.`);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getBusinessMessage(BusinessMessageKey.BUSINESS_DELETED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_DELETED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error deleting business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_DELETE_BUSINESS).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_DELETE_BUSINESS).code });
    res.json(response);
  }
};
