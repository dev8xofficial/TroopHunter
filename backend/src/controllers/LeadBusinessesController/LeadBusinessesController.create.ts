import { Request, Response } from 'express';
import LeadBusiness from '../../models/LeadBusiness/LeadBusiness.model';
import logger from '../../utils/logger';
import { createApiResponse } from '../../utils/response';
import { ApiResponse } from '../../types/Response.interface';
import { LeadBusinessMessageKey, getLeadBusinessMessage } from '../../models/LeadBusiness/LeadBusiness.messages';
import { LeadBusinessAttributes } from '../../models/LeadBusiness/LeadBusiness.interface';

export const createLeadBusinesses = async (req: Request, res: Response) => {
  try {
    const leadBusinessData: LeadBusinessAttributes[] = req.body; // Array of objects, each containing leadId and businessId
    const leadBusinesses = await LeadBusiness.bulkCreate(leadBusinessData);

    const response: ApiResponse<LeadBusiness[]> = createApiResponse({ success: true, data: leadBusinesses, message: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESSES_CREATED).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESSES_CREATED).code });
    res.json(response);
    logger.info('LeadBusinesses created successfully.');
  } catch (error) {
    logger.error('Error while bulk creating LeadBusinesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_CREATE_LEAD_BUSINESSES).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_CREATE_LEAD_BUSINESSES).code });
    res.json(response);
  }
};

export const createLeadBusiness = async (req: Request, res: Response) => {
  const { leadId, businessId }: LeadBusinessAttributes = req.body;

  try {
    const leadBusiness = await LeadBusiness.create({ leadId, businessId });

    const response: ApiResponse<LeadBusiness> = createApiResponse({ success: true, data: leadBusiness, message: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_CREATED).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_CREATED).code });
    res.json(response);
    logger.info('LeadBusiness created successfully.');
  } catch (error) {
    logger.error('Error while creating LeadBusiness:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_CREATE_LEAD_BUSINESS).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_CREATE_LEAD_BUSINESS).code });
    res.json(response);
  }
};
