import { Request, Response } from 'express';
import LeadBusiness from '../../models/LeadBusiness';
import logger from '../../utils/logger';
import { createApiResponse } from 'validator/utils';
import { ApiResponse } from 'validator/interfaces';
import { LeadBusinessMessageKey, getLeadBusinessMessage } from '../../messages/LeadBusiness';

export const deleteLeadBusiness = async (req: Request, res: Response) => {
  const { leadId, businessId } = req.params;

  try {
    const leadBusiness = await LeadBusiness.findOne({ where: { leadId, businessId } });

    if (leadBusiness) {
      await leadBusiness.destroy();

      const response: ApiResponse<{ message: string }> = createApiResponse({ success: true, data: { message: 'LeadBusiness deleted successfully' }, message: `Deleted LeadBusiness with leadId ${leadId} and businessId ${businessId}.`, status: 200 });
      res.json(response);
      logger.info(`Deleted LeadBusiness with leadId ${leadId} and businessId ${businessId}.`);
    } else {
      const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_NOT_FOUND).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_NOT_FOUND).code });
      res.json(response);
      logger.warn(`LeadBusiness with leadId ${leadId} and businessId ${businessId} not found.`);
    }
  } catch (error) {
    logger.error('Error while deleting LeadBusiness:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_DELETE_LEAD_BUSINESS).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_DELETE_LEAD_BUSINESS).code });
    res.json(response);
  }
};
