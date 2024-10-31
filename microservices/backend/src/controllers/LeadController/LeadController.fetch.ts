import { Request, Response } from 'express';
import Lead from '../../models/Lead';
import logger from '../../utils/logger';
import Business from '../../models/Business';
import { createApiResponse } from '@repo/validator';
import { ApiResponse } from '@repo/validator';
import { LeadMessageKey, getLeadMessage } from '../../messages/Lead';

export const getLeads = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: leads } = await Lead.findAndCountAll({
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    logger.info('Successfully retrieved leads');

    const response: ApiResponse<{ totalRecords: number; totalPages: number; leads: Lead[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, leads }, message: getLeadMessage(LeadMessageKey.LEAD_RETRIEVED).message, status: getLeadMessage(LeadMessageKey.LEAD_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving leads:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_RETRIEVE_LEADS).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_RETRIEVE_LEADS).code });
    res.json(response);
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).message, status: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).code });
      return res.json(response);
    }

    logger.info(`Successfully retrieved lead with ID ${id}`);
    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getLeadMessage(LeadMessageKey.LEAD_RETRIEVED).message, status: getLeadMessage(LeadMessageKey.LEAD_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_RETRIEVE_LEAD).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_RETRIEVE_LEAD).code });
    res.json(response);
  }
};

export const getLeadWithBusinesses = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const lead = await Lead.findByPk(id, { include: Business });

    if (!lead) {
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).message, status: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).code });
      return res.json(response);
    }

    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getLeadMessage(LeadMessageKey.LEAD_RETRIEVED).message, status: getLeadMessage(LeadMessageKey.LEAD_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    console.error('Error while retrieving lead:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_RETRIEVE_LEAD).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_RETRIEVE_LEAD).code });
    res.json(response);
  }
};

export const getLeadsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { page, limit } = req.query;

  const pageNumber = parseInt(page as string, 10) || 1;
  const limitNumber = parseInt(limit as string, 10) || 10;

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: leads } = await Lead.findAndCountAll({
      where: { userId },
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    logger.info(`Successfully retrieved leads for user: ${userId}`);

    const response: ApiResponse<{ totalRecords: number; totalPages: number; leads: Lead[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, leads }, message: getLeadMessage(LeadMessageKey.LEADS_RETRIEVED_BY_USERID).message, status: getLeadMessage(LeadMessageKey.LEADS_RETRIEVED_BY_USERID).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving leads for user ${userId}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_RETRIEVE_LEADS_BY_USERID).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_RETRIEVE_LEADS_BY_USERID).code });
    res.json(response);
  }
};
