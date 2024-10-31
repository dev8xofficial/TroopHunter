import { Request, Response } from 'express';
import LeadBusiness from '../../models/LeadBusiness';
import logger from '../../utils/logger';
import { createApiResponse } from 'validator/utils';
import { ApiResponse } from 'validator/interfaces';
import { LeadBusinessMessageKey, getLeadBusinessMessage } from '../../messages/LeadBusiness';

export const updateLeadBusiness = async (req: Request, res: Response) => {
  const { leadId, businessId, newLeadId, newBusinessId } = req.body;
  try {
    const leadBusiness = await LeadBusiness.findOne({ where: { leadId, businessId } });

    if (leadBusiness) {
      const updatedLeadBusiness = await leadBusiness.update({ leadId: newLeadId, businessId: newBusinessId });

      const response: ApiResponse<LeadBusiness> = createApiResponse({ success: true, data: updatedLeadBusiness, message: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_UPDATED).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_UPDATED).code });
      res.json(response);
      logger.info(`Updated LeadBusiness with leadId ${leadId} and businessId ${businessId}.`);
    } else {
      const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_NOT_FOUND).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_NOT_FOUND).code });
      res.json(response);
      logger.warn(`LeadBusiness with leadId ${leadId} and businessId ${businessId} not found.`);
    }
  } catch (error) {
    logger.error('Error while updating LeadBusiness:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_UPDATE_LEAD_BUSINESS).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_UPDATE_LEAD_BUSINESS).code });
    res.json(response);
  }
};
