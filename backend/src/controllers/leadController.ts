import { Request, Response } from 'express';
import Lead from '../models/Lead';
import User from '../models/User';
import logger from '../utils/logger';
import Business from '../models/Business';
import LeadBusiness from '../models/LeadBusiness';
import { createApiResponse } from '../utils/response';
import { getMessage } from '../utils/message';
import { ApiResponse } from '../types/response';
import { getBusinessesByQuery, getBusinessesByQueryingIds } from '../utils/business';
import { LeadAttributes } from '../types/lead';

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.findAll();
    logger.info('Successfully retrieved leads');

    const response: ApiResponse<Lead[]> = createApiResponse({ success: true, data: leads, message: getMessage('LEAD_RETRIEVED').message, status: getMessage('LEAD_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving leads:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LEADS').message, status: getMessage('FAILED_TO_RETRIEVE_LEADS').code });
    res.json(response);
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LEAD_NOT_FOUND').message, status: getMessage('LEAD_NOT_FOUND').code });
      return res.json(response);
    }

    logger.info(`Successfully retrieved lead with ID ${id}`);
    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getMessage('LEAD_RETRIEVED').message, status: getMessage('LEAD_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LEAD').message, status: getMessage('FAILED_TO_RETRIEVE_LEAD').code });
    res.json(response);
  }
};

export const createLead = async (req: Request, res: Response) => {
  const { userId, title, search, categoryId, address, cityId, stateId, countryId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, leadBusinessIds } = req.body;
  try {
    if (!userId) {
      logger.warn(`User ID ${userId} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_USER_ID').message, status: getMessage('MISSING_USER_ID').code });
      return res.json(response);
    }

    const lead = await Lead.create({ userId, title, search, categoryId, address, cityId, stateId, countryId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId });

    let businesses: Business[] | undefined = [];

    if (leadBusinessIds.length > 0) businesses = await getBusinessesByQueryingIds({ ids: leadBusinessIds });
    else businesses = await getBusinessesByQuery({ name: search, categoryId, address, cityId, stateId, countryId, phoneId, email, website, sponsoredAd });

    if (Array.isArray(businesses) && businesses.length > 0) {
      const associations = businesses.map((business) => ({
        leadId: `${lead.id}`,
        businessId: `${business.id}`,
      }));

      await LeadBusiness.bulkCreate(associations);
    } else {
      // Implement the exception
    }

    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getMessage('LEAD_CREATED').message, status: getMessage('LEAD_CREATED').code });
    res.json(response);
  } catch (error) {
    console.error('Error while creating lead:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_CREATE_LEAD').message, status: getMessage('FAILED_TO_CREATE_LEAD').code });
    res.json(response);
  }
};

export const getLeadWithBusinesses = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Retrieve the lead with associated businesses
    const lead = await Lead.findByPk(id, { include: Business });

    if (!lead) {
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LEAD_NOT_FOUND').message, status: getMessage('LEAD_NOT_FOUND').code });
      return res.json(response);
    }

    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getMessage('LEAD_RETRIEVED').message, status: getMessage('LEAD_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    console.error('Error while retrieving lead:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LEAD').message, status: getMessage('FAILED_TO_RETRIEVE_LEAD').code });
    res.json(response);
  }
};

export const updateLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, ...leadData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('USER_NOT_FOUND').message, status: getMessage('USER_NOT_FOUND').code });
      return res.json(response);
    }
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LEAD_NOT_FOUND').message, status: getMessage('LEAD_NOT_FOUND').code });
      return res.json(response);
    }
    await lead.update(leadData);

    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getMessage('LEAD_UPDATED').message, status: getMessage('LEAD_UPDATED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_UPDATE_LEAD').message, status: getMessage('FAILED_TO_UPDATE_LEAD').code });
    res.json(response);
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LEAD_NOT_FOUND').message, status: getMessage('LEAD_NOT_FOUND').code });
      return res.json(response);
    }
    await lead.destroy();

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getMessage('LEAD_DELETED').message, status: getMessage('LEAD_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_DELETE_LEAD').message, status: getMessage('FAILED_TO_DELETE_LEAD').code });
    res.json(response);
  }
};

export const deleteLeads = async (req: Request, res: Response) => {
  const { ids } = req.body; // Assuming that the array of lead IDs is sent in the request body

  try {
    const leads = await Lead.findAll({ where: { id: ids } });

    if (!leads || leads.length === 0) {
      logger.warn('No leads found with the given IDs');
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LEADS_NOT_FOUND').message, status: getMessage('LEADS_NOT_FOUND').code });
      return res.json(response);
    }

    // Deleting leads one by one
    const deletePromises = leads.map((lead) => lead.destroy());
    await Promise.all(deletePromises);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getMessage('LEADS_DELETED').message, status: getMessage('LEADS_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while deleting leads:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_DELETE_LEADS').message, status: getMessage('FAILED_TO_DELETE_LEADS').code });
    res.json(response);
  }
};
