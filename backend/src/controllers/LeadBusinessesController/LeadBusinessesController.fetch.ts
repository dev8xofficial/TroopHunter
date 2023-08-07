import { Request, Response } from 'express';
import LeadBusiness from '../../models/LeadBusiness/LeadBusiness.model';
import logger from '../../utils/logger';
import Business from '../../models/Business/Business.model';
import { createApiResponse } from '../../utils/response';
import { ApiResponse } from '../../types/Response.interface';
import { LeadBusinessMessageKey, getLeadBusinessMessage } from '../../models/LeadBusiness/LeadBusiness.messages';

export const getLeadBusinesses = async (req: Request, res: Response) => {
  try {
    const leadBusinesses = await LeadBusiness.findAll();

    const response: ApiResponse<LeadBusiness[]> = createApiResponse({ success: true, data: leadBusinesses, message: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_RETRIEVED).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_RETRIEVED).code });
    res.json(response);
    logger.info('Retrieved all LeadBusinesses.');
  } catch (error) {
    logger.error('Error while retrieving LeadBusinesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_RETRIEVE_LEAD_BUSINESSES).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_RETRIEVE_LEAD_BUSINESSES).code });
    res.json(response);
  }
};

export const getBusinessesByLeadId = async (req: Request, res: Response) => {
  const { page, limit } = req.params;
  const { leadId } = req.params;

  try {
    // Find all businesses associated with the given leadId and include the Business model
    const leadBusinesses = await LeadBusiness.findAll({ where: { leadId } });

    if (leadBusinesses.length === 0) {
      const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESSES_NOT_FOUND).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESSES_NOT_FOUND).code });
      return res.json(response);
    }

    const businessIds = leadBusinesses.map((leadBusiness) => leadBusiness.businessId);

    const paginationOptions: { [key: string]: number } = {};
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (!isNaN(pageNumber) && pageNumber > 0) {
      paginationOptions.offset = (pageNumber - 1) * limitNumber;
    }

    if (!isNaN(limitNumber) && limitNumber > 0) {
      paginationOptions.limit = limitNumber;
    }

    try {
      const { count, rows: businesses } = await Business.findAndCountAll({ where: { id: businessIds } });

      const totalPages = Math.ceil(count / limitNumber);

      const response: ApiResponse<{ totalRecords: number; totalPages: number; businesses: Business[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businesses }, message: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_RETRIEVED).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_RETRIEVED).code });
      res.json(response);
    } catch (error) {
      logger.error('Error retrieving lead associated businesses:', error);
      const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_RETRIEVE_LEAD_BUSINESSES).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_RETRIEVE_LEAD_BUSINESSES).code });
      res.json(response);
    }
  } catch (error) {
    logger.error('Error while retrieving businesses by leadId:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_RETRIEVE_LEAD_BUSINESSES).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_RETRIEVE_LEAD_BUSINESSES).code });
    res.json(response);
  }
};

export const getLeadBusiness = async (req: Request, res: Response) => {
  const { leadId, businessId } = req.params;

  try {
    const leadBusiness = await LeadBusiness.findOne({ where: { leadId, businessId } });

    if (leadBusiness) {
      const response: ApiResponse<LeadBusiness> = createApiResponse({ success: true, data: leadBusiness, message: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_RETRIEVED).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_RETRIEVED).code });
      res.json(response);
      logger.info(`Retrieved LeadBusiness with leadId ${leadId} and businessId ${businessId}.`);
    } else {
      const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_NOT_FOUND).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_NOT_FOUND).code });
      res.json(response);
      logger.warn(`LeadBusiness with leadId ${leadId} and businessId ${businessId} not found.`);
    }
  } catch (error) {
    logger.error(`Error while retrieving LeadBusiness with lead id ${leadId} and business id ${businessId}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_RETRIEVE_LEAD_BUSINESS).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_RETRIEVE_LEAD_BUSINESS).code });
    res.json(response);
  }
};
