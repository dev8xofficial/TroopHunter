import { Request, Response } from 'express';
import LeadBusiness from '../../models/LeadBusiness/LeadBusiness.model';
import logger from '../../utils/logger';
import Business from '../../models/Business/Business.model';
import { createApiResponse } from '../../utils/response';
import { ApiResponse } from '../../types/Response.interface';
import { LeadBusinessMessageKey, getLeadBusinessMessage } from '../../models/LeadBusiness/LeadBusiness.messages';
import { Op } from 'sequelize';

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
  const { leadId, page, limit } = req.query;

  try {
    // Where clause
    const whereClause: { [key: string]: any } = {};

    if (leadId) {
      whereClause.leadId = { [Op.iLike]: `%${leadId}%` };
    }

    const leadBusinesses = await LeadBusiness.findAll({ where: whereClause });

    if (leadBusinesses.length === 0) {
      const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESSES_NOT_FOUND).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESSES_NOT_FOUND).code });
      return res.json(response);
    }

    const businessIds = leadBusinesses.map((leadBusiness) => leadBusiness.businessId);

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const offset = (pageNumber - 1) * limitNumber;

    try {
      const { count, rows: businesses } = await Business.findAndCountAll({ where: { id: businessIds }, offset, limit: limitNumber });

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
