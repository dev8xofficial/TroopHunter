import { Request, Response } from 'express';
import LeadBusiness from '../models/LeadBusiness/LeadBusiness.model';
import logger from '../utils/logger';
import Business from '../models/Business/Business.model';
import { createApiResponse } from '../utils/response';
import { ApiResponse } from '../types/Response.interface';
import { getMessage } from '../utils/message';
import { getLeadBusinessMessage } from '../models/LeadBusiness/LeadBusiness.messages';

export const createLeadBusinesses = async (req: Request, res: Response) => {
  try {
    const leadBusinessData = req.body; // Array of objects, each containing leadId and businessId
    const leadBusinesses = await LeadBusiness.bulkCreate(leadBusinessData);

    const response: ApiResponse<LeadBusiness[]> = createApiResponse({ success: true, data: leadBusinesses, message: getMessage('LEAD_BUSINESSES_CREATED').message, status: getMessage('LEAD_BUSINESSES_CREATED').code });
    res.json(response);
    logger.info('LeadBusinesses created successfully.');
  } catch (error) {
    logger.error('Error while bulk creating LeadBusinesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_CREATE_LEAD_BUSINESSES').message, status: getMessage('FAILED_TO_CREATE_LEAD_BUSINESSES').code });
    res.json(response);
  }
};

export const createLeadBusiness = async (req: Request, res: Response) => {
  try {
    const { leadId, businessId } = req.body;
    const leadBusiness = await LeadBusiness.create({ leadId, businessId });

    const response: ApiResponse<LeadBusiness> = createApiResponse({ success: true, data: leadBusiness, message: getMessage('LEAD_BUSINESS_CREATED').message, status: getMessage('LEAD_BUSINESS_CREATED').code });
    res.json(response);
    logger.info('LeadBusiness created successfully.');
  } catch (error) {
    logger.error('Error while creating LeadBusiness:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_CREATE_LEAD_BUSINESS').message, status: getMessage('FAILED_TO_CREATE_LEAD_BUSINESS').code });
    res.json(response);
  }
};

export const getBusinessesByLeadId = async (req: Request, res: Response) => {
  try {
    const { leadId, page, limit } = req.params;

    // Find all businesses associated with the given leadId and include the Business model
    const leadBusinesses = await LeadBusiness.findAll({ where: { leadId } });

    if (leadBusinesses.length === 0) {
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LEAD_BUSINESSES_NOT_FOUND').message, status: getMessage('LEAD_BUSINESSES_NOT_FOUND').code });
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

      const response: ApiResponse<{ totalRecords: number; totalPages: number; businesses: Business[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businesses }, message: getMessage('RETRIEVED_LEAD_BUSINESSES').message, status: getMessage('RETRIEVED_LEAD_BUSINESSES').code });
      res.json(response);
    } catch (error) {
      logger.error('Error retrieving lead associated businesses:', error);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LEAD_BUSINESSES').message, status: getMessage('FAILED_TO_RETRIEVE_LEAD_BUSINESSES').code });
      res.json(response);
    }
  } catch (error) {
    logger.error('Error while retrieving businesses by leadId:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LEAD_BUSINESSES').message, status: getMessage('FAILED_TO_RETRIEVE_LEAD_BUSINESSES').code });
    res.json(response);
  }
};

export const getLeadBusinesses = async (req: Request, res: Response) => {
  try {
    const leadBusinesses = await LeadBusiness.findAll();

    const response: ApiResponse<LeadBusiness[]> = createApiResponse({ success: true, data: leadBusinesses, message: getMessage('RETRIEVED_LEAD_BUSINESSES').message, status: getMessage('RETRIEVED_LEAD_BUSINESSES').code });
    res.json(response);
    logger.info('Retrieved all LeadBusinesses.');
  } catch (error) {
    logger.error('Error while retrieving LeadBusinesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LEAD_BUSINESSES').message, status: getMessage('FAILED_TO_RETRIEVE_LEAD_BUSINESSES').code });
    res.json(response);
  }
};

export const getLeadBusiness = async (req: Request, res: Response) => {
  try {
    const { leadId, businessId } = req.params;
    const leadBusiness = await LeadBusiness.findOne({ where: { leadId, businessId } });

    if (leadBusiness) {
      const response: ApiResponse<LeadBusiness> = createApiResponse({ success: true, data: leadBusiness, message: getLeadBusinessMessage('LEADBUSINESS_RETRIEVED').message, status: getLeadBusinessMessage('LEADBUSINESS_RETRIEVED').code });
      res.json(response);
      logger.info(`Retrieved LeadBusiness with leadId ${leadId} and businessId ${businessId}.`);
    } else {
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LEAD_BUSINESS_NOT_FOUND').message, status: getMessage('LEAD_BUSINESS_NOT_FOUND').code });
      res.json(response);
      logger.warn(`LeadBusiness with leadId ${leadId} and businessId ${businessId} not found.`);
    }
  } catch (error) {
    logger.error('Error while retrieving LeadBusiness:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LEAD_BUSINESS').message, status: getMessage('FAILED_TO_RETRIEVE_LEAD_BUSINESS').code });
    res.json(response);
  }
};

export const updateLeadBusiness = async (req: Request, res: Response) => {
  try {
    const { leadId, businessId } = req.params;
    const { newLeadId, newBusinessId } = req.body;
    const leadBusiness = await LeadBusiness.findOne({ where: { leadId, businessId } });

    if (leadBusiness) {
      const updatedLeadBusiness = await leadBusiness.update({ leadId: newLeadId, businessId: newBusinessId });

      const response: ApiResponse<LeadBusiness> = createApiResponse({ success: true, data: updatedLeadBusiness, message: getLeadBusinessMessage('LEADBUSINESS_UPDATED').message, status: getLeadBusinessMessage('LEADBUSINESS_UPDATED').code });
      res.json(response);
      logger.info(`Updated LeadBusiness with leadId ${leadId} and businessId ${businessId}.`);
    } else {
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LEAD_BUSINESS_NOT_FOUND').message, status: getMessage('LEAD_BUSINESS_NOT_FOUND').code });
      res.json(response);
      logger.warn(`LeadBusiness with leadId ${leadId} and businessId ${businessId} not found.`);
    }
  } catch (error) {
    logger.error('Error while updating LeadBusiness:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_UPDATE_LEAD_BUSINESS').message, status: getMessage('FAILED_TO_UPDATE_LEAD_BUSINESS').code });
    res.json(response);
  }
};

export const deleteLeadBusiness = async (req: Request, res: Response) => {
  try {
    const { leadId, businessId } = req.params;
    const leadBusiness = await LeadBusiness.findOne({ where: { leadId, businessId } });

    if (leadBusiness) {
      await leadBusiness.destroy();

      const response: ApiResponse<{ message: string }> = createApiResponse({ success: true, data: { message: 'LeadBusiness deleted successfully' }, message: `Deleted LeadBusiness with leadId ${leadId} and businessId ${businessId}.`, status: 200 });
      res.json(response);
      logger.info(`Deleted LeadBusiness with leadId ${leadId} and businessId ${businessId}.`);
    } else {
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LEAD_BUSINESS_NOT_FOUND').message, status: getMessage('LEAD_BUSINESS_NOT_FOUND').code });
      res.json(response);
      logger.warn(`LeadBusiness with leadId ${leadId} and businessId ${businessId} not found.`);
    }
  } catch (error) {
    logger.error('Error while deleting LeadBusiness:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_DELETE_LEAD_BUSINESS').message, status: getMessage('FAILED_TO_DELETE_LEAD_BUSINESS').code });
    res.json(response);
  }
};
