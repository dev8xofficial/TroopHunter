import { Request, Response } from 'express';
import LeadBusiness from '../../models/LeadBusiness/LeadBusiness.model';
import logger from '../../utils/logger';
import { createApiResponse } from '../../utils/response';
import { ApiResponse } from '../../types/Response.interface';
import { LeadBusinessMessageKey, getLeadBusinessMessage } from '../../models/LeadBusiness/LeadBusiness.messages';
import { LeadBusinessSchema, createLeadBusinessErrorResponse } from '../../models/LeadBusiness/LeadBusiness.schema';
import { LeadBusinessAttributes } from '../../models/LeadBusiness/LeadBusiness.interface';

export const createLeadBusinesses = async (req: Request, res: Response) => {
  try {
    const leadBusinessData = req.body; // Array of objects, each containing leadId and businessId
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
  const { error, value: validatedData } = LeadBusinessSchema.validate(req.body, { abortEarly: false });
  const { leadId, businessId } = validatedData as LeadBusinessAttributes;

  try {
    if (error) {
      const errorResponse = createLeadBusinessErrorResponse(error);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

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
